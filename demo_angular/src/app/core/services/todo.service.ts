import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo, ApiResponse } from '../models/todo.model';
import { ToastService } from './toast.service';

const API_URL = 'http://localhost:8080/api/v1/todos';

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);

  // Centralized State
  private state = signal<TodoState>({
    todos: [],
    loading: false,
    error: null
  });

  // Selectors
  todos = computed(() => this.sortTodos(this.state().todos));
  loading = computed(() => this.state().loading);
  error = computed(() => this.state().error);

  private sortTodos(todos: Todo[]): Todo[] {
    return [...todos].sort((a, b) => {
      const dateA = a.updated || a.created || '';
      const dateB = b.updated || b.created || '';
      return dateB.localeCompare(dateA);
    });
  }

  loadTodos(): void {
    this.state.update(s => ({ ...s, loading: true, error: null }));
    this.http.get<ApiResponse<Todo[]>>(API_URL).subscribe({
      next: (res) => {
        this.state.update(s => ({ ...s, todos: res.data, loading: false }));
      },
      error: () => {
        const errorMsg = 'Không thể kết nối server. Kiểm tra backend đã chạy chưa.';
        this.state.update(s => ({ ...s, loading: false, error: errorMsg }));
        this.toast.error(errorMsg);
      }
    });
  }

  addTodo(text: string): void {
    this.http.post<ApiResponse<Todo>>(API_URL, { text, done: false }).subscribe({
      next: (res) => {
        this.state.update(s => ({ ...s, todos: [...s.todos, res.data], error: null }));
        this.toast.success('Đã thêm công việc mới!');
      },
      error: () => {
        this.toast.error('Thêm thất bại.');
      }
    });
  }

  updateTodo(id: number, data: Partial<Todo>): void {
    this.http.put<ApiResponse<Todo>>(`${API_URL}/${id}`, data).subscribe({
      next: (res) => {
        this.state.update(s => ({
          ...s,
          todos: s.todos.map(t => t.id === id ? res.data : t),
          error: null
        }));
        this.toast.success('Cập nhật thành công!');
      },
      error: () => {
        this.toast.error('Cập nhật thất bại.');
      }
    });
  }

  deleteTodo(id: number): void {
    this.http.delete<void>(`${API_URL}/${id}`).subscribe({
      next: () => {
        this.state.update(s => ({
          ...s,
          todos: s.todos.filter(t => t.id !== id),
          error: null
        }));
        this.toast.warning('Đã xóa công việc.');
      },
      error: () => {
        this.toast.error('Xóa thất bại.');
      }
    });
  }

  clearError(): void {
    this.state.update(s => ({ ...s, error: null }));
  }
}

