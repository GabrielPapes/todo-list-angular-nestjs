import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { TodoFormComponent } from '../todo-form/todo-form.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card?: Todo;

  private subscriptions: Array<Subscription>;
  set subscription(s: Subscription) {
    this.subscriptions.push(s);
  }

  constructor(
    private dialog: MatDialog,
  ) { 
    this.subscriptions = new Array<Subscription>();
  }

  ngOnInit(): void {}


  openDialog(todoId: string): void {
    const data = {id: todoId || null}

    const dialogRef = this.dialog.open(TodoFormComponent, {
      width: '50vw',
      data: data
    });

    this.subscription = dialogRef.afterClosed().subscribe(() => {
      console.log('Closed Form');
    })
  }

}
