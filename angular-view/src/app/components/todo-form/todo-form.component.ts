import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { first } from 'rxjs';
import { TodoDTO } from 'src/app/dto/todo.dto';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  id = null;
  title = new FormControl('', Validators.required);
  description = new FormControl('');
  status = new FormControl('todo',  Validators.required)
  

  constructor(
    public dialogRef: MatDialogRef<TodoFormComponent>,
    private todoService: TodoService,
  ) {}

  ngOnInit(): void {
    if(this.id) {
      this.todoService.getTodo(this.id)
        .pipe(first(val => val !== null))
        .subscribe(todo => {
          this.title.setValue(todo.title);
          this.description.setValue(todo.description);
        })
    }
  }

  changeStatus(status: string) {
    console.log(status)
    this.status.setValue(status);
  }

  onSubmit(): void {
    const todo: TodoDTO = {
      title: this.title.value!,
      description: this.description.value!,
      status: this.status.value!,
      creationDate: new Date(),
    }

    console.log(todo)

    this.todoService.createTodo(todo)
      .subscribe((resp) => {
        console.log(resp)
        this.todoService.notify("todo created")
        this.dialogRef.close();
      })
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
