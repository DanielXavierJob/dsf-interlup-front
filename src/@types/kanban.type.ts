import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  SensorDescriptor,
  SensorOptions,
} from "@dnd-kit/core";
import { ColumnCard } from "./card.type";
import { Task } from "./task.type";

interface KanbanContextProps {
  columns: ColumnCard[];
  columnsId: string[];
  createNewColumn: () => void;
  deleteColumn: (hash: string) => void;
  updateColumn: (hash: string, title: string) => void;
  activeColumn: ColumnCard | null;
  activeTask: Task | null;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  createTask: (task: CreateNewTaskProps) => Promise<void>;
  deleteTask: (id: number) => void;
  updateTask: (id: number, taskUpdate: Task, isForm?: boolean) => Promise<boolean>;
  sensors: SensorDescriptor<SensorOptions>[];
  onDragStart: (event: DragStartEvent) => void;
  onDragEnd: (event: DragEndEvent) => void;
  onDragOver: (event: DragOverEvent) => void;
  openDrawerEdit: (task: Task) => void;
  closeDrawerEdit: () => void;
  openDrawerEditTask: boolean;
  activeTaskEdit: Task | null;
  skeleton: boolean;
  openDrawerToCreateTask: (category_id: string) => void;
  updateTitleColumn: (id: string, title: string) => Promise<void>
}
interface CreateNewTaskProps {
  title: string;
  description?: string;
  order: number;
  category_id: string;
}
export { KanbanContextProps, CreateNewTaskProps };
