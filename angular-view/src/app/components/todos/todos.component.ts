import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TodoService } from 'src/app/services/todo.service';
import { TodoDTO } from 'src/app/dto/todo.dto';
import { TodoFormComponent } from '../todo-form/todo-form.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todo: Array<TodoDTO> = [];
  progress: Array<TodoDTO> = [];
  done: Array<TodoDTO> = [];

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

  }

  ngOnInit(): void {
    this.todoService.getAllTodos()
      .subscribe(todos => {
        console.log(todos);
        todos.forEach(td => {
          if(td.status === 'todo') this.todo.push(td)
          if(td.status === 'progress') this.todo.push(td)
          if(td.status === 'done') this.done.push(td)
        })
      })
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
