interface Task {
  id: number;
  category_id: string;
  title: string;
  description?: string;
  user_id: number;
  order: number;
};
interface TaskUpdate {
  id?: number;
  category_id?: string;
  title?: string;
  description?: string;
  user_id?: number;
  order?: number;
}
interface TaskCardProps {
  task: Task;
}

export { Task,  TaskCardProps, TaskUpdate };