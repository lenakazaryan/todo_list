export interface Todo {
  todos: string;
  isCompleted: boolean;
  edit?: boolean;
  search?: string;
  editId?: string | number;
  id?: string;
}
