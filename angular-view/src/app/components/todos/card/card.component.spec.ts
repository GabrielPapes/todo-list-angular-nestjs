import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardComponent } from './card.component';
import { TodoFormComponent } from '../todo-form/todo-form.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(() => {
    const matDialogStub = () => ({
      open: (todoFormComponent: TodoFormComponent, object: Object) => ({
        afterClosed: () => ({ subscribe: (f: any) => f({}) })
      })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CardComponent],
      providers: [{ provide: MatDialog, useFactory: matDialogStub }]
    });
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
