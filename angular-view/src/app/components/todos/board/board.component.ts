import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ListTodo } from 'src/app/models/list-todo.model';
import { Todo } from 'src/app/models/todo.model';
import { CardStore } from 'src/app/states/card.store';
import { GetTodo } from 'src/app/states/todo.action';
import { selectTodoList, TodoState } from 'src/app/states/todo.state';
import { TodoFormComponent } from '../todo-form/todo-form.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  cardStore: CardStore;
  lists: ListTodo[];

  todoState$: Observable<Todo[]>;

  private subscriptions: Array<Subscription>;
  set subscription(s: Subscription) {
    this.subscriptions.push(s);
  }

  constructor(
    private store: Store<TodoState>
  ) {
    this.subscriptions = new Array<Subscription>();
    this.todoState$ = this.store.pipe(select((states: any) => selectTodoList(states)));

    this.cardStore = new CardStore();
    this.lists = [
      {
        name: 'Para Fazer',
        cards: [],
        status: 'todo'
      },
      {
        name: 'Em Progresso',
        cards: [],
        status: 'progress'
      },
      {
        name: 'Concluído',
        cards: [],
        status: 'done'
      }
    ]
  }

  ngOnInit(): void {
    const getTodoAction = new GetTodo();
    
    this.subscription = this.todoState$
    .subscribe((todos: Todo[]) => {
      const todo: Todo[] = [];
      const progress: Todo[] = [];
      const done: Todo[] = [];

      todos.forEach(td => {
        if(td.status === 'todo') todo.push(td)
        if(td.status === 'progress') progress.push(td)
        if(td.status === 'done') done.push(td)
      })

      this.lists = [
        {
          name: 'Para Fazer',
          cards: todo,
          status: 'todo'
        },
        {
          name: 'Em Progresso',
          cards: progress,
          status: 'progress'
        },
        {
          name: 'Concluído',
          cards: done,
          status: 'done'
        }
      ]
    });

    this.store.dispatch(getTodoAction);
  }

}
