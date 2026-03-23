import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../core/services/todo.service';
import { Todo } from '../../core/models/todo.model';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TodoFormComponent,
    TodoListComponent,
    ModalComponent
  ],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  title = 'Todo List';
  
  // Inject Service
  todoService = inject(TodoService);

  // Expose signals to template
  todos = this.todoService.todos;
  loading = this.todoService.loading;
  error = this.todoService.error;

  // Local View State for Modals
  todoToDelete: Todo | null = null;
  todoToEdit: Todo | null = null;
  editFormText = '';

  ngOnInit(): void {
    this.todoService.loadTodos();
  }

  onAddTodo(text: string): void {
    this.todoService.addTodo(text);
  }

  onToggleTodo(todo: Todo): void {
    this.todoService.updateTodo(todo.id, { text: todo.text, done: !todo.done });
  }

  // Edit Flow
  openEditModal(todo: Todo): void {
    this.todoToEdit = todo;
    this.editFormText = todo.text;
  }

  closeEditModal(): void {
    this.todoToEdit = null;
    this.editFormText = '';
  }

  saveEdit(): void {
    if (!this.todoToEdit) return;
    const trimmed = this.editFormText.trim();
    if (trimmed) {
      this.todoService.updateTodo(this.todoToEdit.id, { text: trimmed, done: this.todoToEdit.done });
    }
    this.closeEditModal();
  }

  // Delete Flow
  openDeleteModal(todo: Todo): void {
    this.todoToDelete = todo;
  }

  closeDeleteModal(): void {
    this.todoToDelete = null;
  }

  confirmDelete(): void {
    if (this.todoToDelete) {
      this.todoService.deleteTodo(this.todoToDelete.id);
    }
    this.closeDeleteModal();
  }
}
