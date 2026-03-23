import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../../../core/models/todo.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input({ required: true }) todo!: Todo;
  
  @Output() toggle = new EventEmitter<Todo>();
  @Output() edit = new EventEmitter<Todo>();
  @Output() remove = new EventEmitter<Todo>();

  onToggle(): void {
    this.toggle.emit(this.todo);
  }

  onEdit(): void {
    this.edit.emit(this.todo);
  }

  onRemove(): void {
    this.remove.emit(this.todo);
  }
}
