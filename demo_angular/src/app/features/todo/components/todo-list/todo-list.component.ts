import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../../../core/models/todo.model';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];
  @Input() loading = false;

  @Output() toggle = new EventEmitter<Todo>();
  @Output() edit = new EventEmitter<Todo>();
  @Output() remove = new EventEmitter<Todo>();

  onToggle(todo: Todo): void {
    this.toggle.emit(todo);
  }

  onEdit(todo: Todo): void {
    this.edit.emit(todo);
  }

  onRemove(todo: Todo): void {
    this.remove.emit(todo);
  }
}
