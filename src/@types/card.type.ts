import { Task } from "./task.type";

interface ColumnCard {
  id: string;
  title: string;
  order: number;
  user_id: number;
  tasks: Task[];
}

interface ColumnContainerProps {
  column: ColumnCard;
  tasks: Task[];
}
export { ColumnCard, ColumnContainerProps };
