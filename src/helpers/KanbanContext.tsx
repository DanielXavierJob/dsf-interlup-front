import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ColumnCard } from "../@types/card.type";
import { Task, TaskUpdate } from "../@types/task.type";
import { defaultCols, defaultTasks } from "../mocks/data";
import { CreateNewTaskProps, KanbanContextProps } from "../@types/kanban.type";
import { AuthenticationContext } from "./AuthenticationContext";
import { MessageContext } from "./MessagesContext";
import { FetchResponseProps } from "../@types/fetch.type";
import getDifferences from "../utils/getDifferences";
export const KanbanContext = createContext<KanbanContextProps>({
  columns: defaultCols,
  columnsId: defaultCols.map((col) => col.id),
  createNewColumn: () => {},
  deleteColumn: (id: string) => {},
  updateColumn: (id: string, title: string) => {},
  activeColumn: null,
  activeTask: null,
  tasks: defaultTasks,
  setTasks: (value) => {},
  createTask: (task: CreateNewTaskProps) => {
    return Promise.resolve();
  },
  deleteTask: (id: number) => {},
  updateTask: (id: number, task: Task, isForm?: boolean) => Promise.resolve(true),
  sensors: [],
  onDragEnd: (event: DragEndEvent) => {},
  onDragOver: (event: DragOverEvent) => {},
  onDragStart: (event: DragStartEvent) => {},
  openDrawerEdit: (task: Task) => {},
  closeDrawerEdit: () => {},
  openDrawerEditTask: false,
  activeTaskEdit: null,
  skeleton: true,
  openDrawerToCreateTask: (category_id: string) => {},
  updateTitleColumn: (id: string, title: string) => Promise.resolve(),
});
const KanbanProvider = ({ children }: { children: React.ReactNode }) => {
  const [columns, setColumns] = useState<ColumnCard[]>(defaultCols);
  const [openDrawerEditTask, setOpenDrawerEditTask] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [activeColumn, setActiveColumn] = useState<ColumnCard | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [activeTaskEdit, setActiveTaskEdit] = useState<Task | null>(null);
  const [skeleton, setSkeleton] = useState<boolean>(true);
  const { authorization } = useContext(AuthenticationContext);
  const { success, error } = useContext(MessageContext);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  useEffect(() => {
    getColumnsAndTasks();
  }, []);

  useEffect(() => {
    setColumns((columns) =>
      columns.sort((a, b) => (a.order - b.order ? -1 : 1))
    );
  }, [columns]);

  const getColumnsAndTasks = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authorization}`,
        },
      };

      const requestColumns = await fetch(
        `${process.env.REACT_APP_API_URL}/task-category?exclude_tasks=true`,
        options
      );
      const responseColumns: FetchResponseProps<ColumnCard[]> =
        await requestColumns.json();

      if (requestColumns.status === 200) {
        setColumns(responseColumns.result);
        const requestTasks = await fetch(
          `${process.env.REACT_APP_API_URL}/task`,
          options
        );
        const responseTasks: FetchResponseProps<Task[]> =
          await requestTasks.json();
        if (requestTasks.status === 200) {
          setTasks(responseTasks.result);
          setSkeleton(false);
        } else {
          throw new Error(responseTasks.message);
        }
      } else {
        throw new Error(responseColumns.message);
      }
    } catch (err: Error | any) {
      error(err.message);
    }
  };
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const openDrawerToCreateTask = (category_id: string) => {
    const newTask: Task = {
      id: 0,
      category_id,
      title: `Task ${tasks.length + 1}`,
      description: "",
      order:
        tasks.filter((task) => task.category_id === category_id).length + 1,
      user_id: 0,
    };
    openDrawerEdit(newTask);
  };

  const createTask = async (task: CreateNewTaskProps) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authorization}`,
        },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          category_id: task.category_id,
          order: task.order,
        }),
      };

      const requestCreateTask = await fetch(
        `${process.env.REACT_APP_API_URL}/task`,
        options
      );
      const responseCreateTask: FetchResponseProps<Task> =
        await requestCreateTask.json();

      if (requestCreateTask.status === 201) {
        success(responseCreateTask.message);
        closeDrawerEdit();
        setTasks([...tasks, responseCreateTask.result]);
      } else {
        throw new Error(responseCreateTask.message);
      }
    } catch (err: Error | any) {
      error(err.message);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authorization}`,
        },
      };

      const requestDeleteTask = await fetch(
        `${process.env.REACT_APP_API_URL}/task/${id}`,
        options
      );
      const responseDeleteTask: FetchResponseProps<string> =
        await requestDeleteTask.json();

      if (requestDeleteTask.status === 200) {
        success(responseDeleteTask.message);
        closeDrawerEdit();
        setTasks(tasks.filter((task) => task.id !== id));
      } else {
        throw new Error(responseDeleteTask.message);
      }
    } catch (err: Error | any) {
      error(err.message);
    }
  };

  const updateTask = async (id: number, taskUpdate: TaskUpdate, isForm?: boolean) => {
    try {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authorization}`,
        },
        body: JSON.stringify({
          title: taskUpdate?.title,
          description: taskUpdate?.description,
          category_id: taskUpdate?.category_id,
          order: taskUpdate?.order,
        }),
      };

      const requestUpdateTask = await fetch(
        `${process.env.REACT_APP_API_URL}/task/${id}`,
        options
      );

      const responseUpdateTask: FetchResponseProps<Task> =
        await requestUpdateTask.json();

      if (requestUpdateTask.status === 200) {
        success(responseUpdateTask.message);
        if(isForm){
          setTasks(tasks.map((task) => (task.id === id? responseUpdateTask.result : task)));
          setActiveTaskEdit(responseUpdateTask.result)
        }
        return true;
      } else {
        throw new Error(responseUpdateTask.message);
      }
    } catch (err: Error | any) {
      error(err.message);
      return false;
    }
  };

  const createNewColumn = async () => {
    try {
      const columnToAdd = {
        title: `Column ${columns.length + 1}`,
        order: columns.length + 1,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authorization}`,
        },
        body: JSON.stringify(columnToAdd),
      };

      const requestCreateTaskColumn = await fetch(
        `${process.env.REACT_APP_API_URL}/task-category`,
        options
      );
      const responseCreateTaskColumn: FetchResponseProps<ColumnCard> =
        await requestCreateTaskColumn.json();

      if (requestCreateTaskColumn.status === 201) {
        success(responseCreateTaskColumn.message);
        setColumns([...columns, responseCreateTaskColumn.result]);
      } else {
        throw new Error(responseCreateTaskColumn.message);
      }
    } catch (err: Error | any) {
      error(err.message);
    }
  };

  const deleteColumn = async (id: string) => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authorization}`,
        },
      };

      const requestDeleteTaskCategory = await fetch(
        `${process.env.REACT_APP_API_URL}/task-category/${id}`,
        options
      );
      const responseDeleteTaskCategory: FetchResponseProps<string> =
        await requestDeleteTaskCategory.json();

      if (requestDeleteTaskCategory.status === 200) {
        success(responseDeleteTaskCategory.message);
        const filteredColumns = columns.filter((col) => col.id !== id);
        setColumns(filteredColumns);
        const newTasks = tasks.filter((t) => t.category_id !== id);
        setTasks(newTasks);
      } else {
        throw new Error(responseDeleteTaskCategory.message);
      }
    } catch (err: Error | any) {
      error(err.message);
    }
  };

  const updateColumn = async (id: string, title?: string, order?: number) => {
    try {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authorization}`,
        },
        body: JSON.stringify({
          title,
          order,
        }),
      };

      const requestUpdateTaskCategory = await fetch(
        `${process.env.REACT_APP_API_URL}/task-category/${id}?exclude_tasks=true`,
        options
      );

      const responseUpdateTaskCategory: FetchResponseProps<Task> =
        await requestUpdateTaskCategory.json();

      if (requestUpdateTaskCategory.status === 200) {
        success(responseUpdateTaskCategory.message);
        if (!order) {
          const newColumns = columns.map((col) => {
            if (col.id !== id) return col;
            return {
              ...col,
              title: title ?? col.title,
            };
          });
          setColumns(newColumns);
        }
      } else {
        throw new Error(responseUpdateTaskCategory.message);
      }
    } catch (err: Error | any) {
      error(err.message);
    }
  };
  const updateTitleColumn = async (id: string, title: string) => {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return {
        ...col,
        title: title ?? col.title,
      };
    });
    setColumns(newColumns);
  };
  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";

    if (isActiveAColumn) {
      const overColumnIndex = columns.findIndex((col) => col.id === overId);
      updateColumn(activeId.toString(), undefined, overColumnIndex + 1);
      setColumns((columns) => {
        const activeColumnIndex = columns.findIndex(
          (col) => col.id === activeId
        );

        const overColumnIndex = columns.findIndex((col) => col.id === overId);

        return arrayMove(columns, activeColumnIndex, overColumnIndex);
      });
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        console.log(activeId, overId);
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);
        if (activeIndex === overIndex) {
          return tasks;
        }

        if (tasks[activeIndex].category_id !== tasks[overIndex].category_id) {
          tasks[activeIndex].category_id = tasks[overIndex].category_id;
          updateTask(Number(activeId), {
            order: tasks[overIndex].order - 1,
            category_id: tasks[overIndex].category_id,
          });
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }
        updateTask(Number(activeId), {
          order: tasks[overIndex].order,
          category_id: tasks[overIndex].category_id,
        });
        return arrayMove(tasks, activeIndex, overIndex);
      });
      return;
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        tasks[activeIndex].category_id = overId.toString();
        updateTask(Number(activeId), {
          ...tasks[activeIndex],
          order: activeIndex,
          category_id: overId.toString(),
        });
        // drop in last position in column
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  const openDrawerEdit = (task: Task) => {
    setActiveTaskEdit(task);
    setOpenDrawerEditTask(true);
  };

  const closeDrawerEdit = () => {
    setActiveTaskEdit(null);
    setOpenDrawerEditTask(false);
  };

  return (
    <KanbanContext.Provider
      value={{
        columns,
        columnsId,
        createNewColumn,
        deleteColumn,
        updateColumn,
        activeColumn,
        activeTask,
        tasks,
        setTasks,
        createTask,
        deleteTask,
        updateTask,
        sensors,
        onDragStart,
        onDragEnd,
        onDragOver,
        openDrawerEdit,
        closeDrawerEdit,
        openDrawerEditTask,
        activeTaskEdit,
        skeleton,
        openDrawerToCreateTask,
        updateTitleColumn,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
};

export default KanbanProvider;
