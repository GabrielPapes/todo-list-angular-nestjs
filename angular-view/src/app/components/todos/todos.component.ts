import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { Todo } from 'src/app/models/todo.model';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { TodoState } from 'src/app/states/todo.state';
import { GetTodo } from 'src/app/states/todo.action';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit, OnDestroy {
  todoState$: Observable<TodoState>;

  todo: Array<Todo> = [];
  progress: Array<Todo> = [];
  done: Array<Todo> = [];

  private subscriptions: Array<Subscription>;
  set subscription(s: Subscription) {
    this.subscriptions.push(s);
  }


  // todo = [
  //   'Get to work',
  //   'Pick up groceries',
  //   'Go home',
  //   'Fall asleep'
  // ];

  // progress = [
  //   'Get to work',
  //   'Pick up groceries',
  //   'Go home',
  //   'Fall asleep'
  // ]

  // done = [
  //   'Get up',
  //   'Brush teeth',
  //   'Take a shower',
  //   'Check e-mail',
  //   'Walk dog'
  // ];

  constructor(
    public dialog: MatDialog,
    private store: Store<TodoState>,
  ) {
    this.todoState$ = this.store;
    this.subscriptions = new Array<Subscription>();
  }

  ngOnInit(): void {
    let getTodoAction = new GetTodo();
    this.todoState$
    .subscribe((obj: any) => {
      this.todo = [];
      this.progress = [];
      this.done = [];

      const todos: TodoState = obj.todos;
      todos.TodoList.forEach(td => {
        if(td.status === 'todo') this.todo.push(td)
        if(td.status === 'progress') this.progress.push(td)
        if(td.status === 'done') this.done.push(td)
      })
    })

    this.store.dispatch(getTodoAction);

    // this.subscription = this.todoService.getReplaySubject()
    //   .subscribe(() => {
    //     this.subscription = this.todoService.getAllTodos()
    //       .subscribe(todos => {
    //         this.todo = [];
    //         this.progress = [];
    //         this.done = [];

    //         console.log(todos);
    //         todos.forEach(td => {
    //           if(td.status === 'todo') this.todo.push(td)
    //           if(td.status === 'progress') this.progress.push(td)
    //           if(td.status === 'done') this.done.push(td)
    //         })
    //       })
    //   })

    //   this.todoService.notify("initializing component")

  }

  ngOnDestroy(): void {
    this.todoState$
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  drop(event: CdkDragDrop<Todo[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
    }
  }

  openDialog(todoId = null): void {
    const data = {id: todoId || null}

    const dialogRef = this.dialog.open(TodoFormComponent, {
      width: "50vw",
      data: data
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('Closed Dialog');
      
    });
  }
  
}
