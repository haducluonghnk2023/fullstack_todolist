export interface Todo {
  id: number;
  text: string;
  done: boolean;
  created?: string;
  updated?: string;
}

export interface ApiResponse<T> {
  code: number;
  status: string;
  data: T;
}
