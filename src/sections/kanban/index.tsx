import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

import ColumnContainer from "../../components/card/ColumnCard";
import TaskCard from "../../components/card/TaskCard";
import { useContext } from "react";
import { KanbanContext } from "../../helpers/KanbanContext";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Skeleton } from "antd";

const KanbanSection = () => {
  const {
    sensors,
    onDragStart,
    onDragEnd,
    onDragOver,
    columnsId,
    columns,
    tasks,
    createNewColumn,
    activeColumn,
    activeTask,
  } = useContext(KanbanContext);

  return (
    <div
      className="
        m-auto
        flex
        min-h-screen
        w-full
        items-center
        overflow-x-auto
        overflow-y-hidden
        px-[40px]
    "
    >
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  tasks={tasks.filter((task) => task.category_id === col.id)}
                />
              ))}
            </SortableContext>
          </div>
          <Button
            onClick={() => {
              createNewColumn();
            }}
            type="text"
            className="
                h-[60px]
                w-[350px]
                min-w-[350px]
                cursor-pointer
                rounded-lg
                bg-mainBackgroundColor
                border-2
                border-columnBackgroundColor
                p-4
                ring-rose-500
                hover:ring-2
                flex
                gap-2
                "
          >
            <PlusCircleOutlined
              style={{
                fontSize: "20px",
              }}
            />
            Add Column
          </Button>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                tasks={tasks.filter(
                  (task) => task.category_id === activeColumn.id
                )}
              />
            )}
            {activeTask && (
                <TaskCard task={activeTask} />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};

export default KanbanSection;
