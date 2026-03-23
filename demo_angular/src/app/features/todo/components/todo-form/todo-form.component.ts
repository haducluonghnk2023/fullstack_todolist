import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  @Output() add = new EventEmitter<string>();
  
  newTodo = '';

  onSubmit(): void {
    const text = this.newTodo.trim();
    if (text) {
      this.add.emit(text);
      this.newTodo = '';
    }
  }
}
