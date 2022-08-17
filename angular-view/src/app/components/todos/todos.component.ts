import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TodoService } from 'src/app/services/todo.service';
import { TodoDTO } from 'src/app/dto/todo.dto';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todo: Array<TodoDTO> = [];
  progress: Array<TodoDTO> = [];
  done: Array<TodoDTO> = [];

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
    private todoService: TodoService,
    public dialog: MatDialog
  ) {
    this.subscriptions = new Array<Subscription>();
  }

  ngOnInit(): void {
    this.subscription = this.todoService.getReplaySubject()
      .subscribe(() => {
        this.subscription = this.todoService.getAllTodos()
          .subscribe(todos => {
            this.todo = [];
            this.progress = [];
            this.done = [];

            console.log(todos);
            todos.forEach(td => {
              if(td.status === 'todo') this.todo.push(td)
              if(td.status === 'progress') this.progress.push(td)
              if(td.status === 'done') this.done.push(td)
            })
          })
      })

      this.todoService.notify("initializing component")

  }

  



  drop(event: CdkDragDrop<TodoDTO[]>): void {
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
