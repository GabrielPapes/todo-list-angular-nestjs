import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import ActionWithPayload from 'src/app/models/actionWithPayload.model';
import { ListTodo } from 'src/app/models/list-todo.model';
import { Todo } from 'src/app/models/todo.model';
import { CardStore } from 'src/app/states/card.store';
import { CREATE_TODO } from 'src/app/states/todo.action';
import { TodoState } from 'src/app/states/todo.state';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() list?: ListTodo;
  @Input() cardStore?: CardStore;

  addCard = false;
  title = new FormControl('', Validators.required);

  constructor(
    private store: Store<TodoState>,
  ) { }

  ngOnInit(): void {
  }
  
  toggleAddCard() {
    this.addCard = !this.addCard;
  }

  onEnter(title: string, status = 'todo') {
    const todo: Todo = {
      title: title,
      status: status,
      description: '',
      creationDate: new Date(),
    }

    const todoAction: ActionWithPayload<Todo> = {
      type: CREATE_TODO,
      payload: todo
    }

    this.store.dispatch(todoAction)
  }


}
