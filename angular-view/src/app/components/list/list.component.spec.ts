import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { ListComponent } from './list.component';
import ActionWithPayload from 'src/app/models/actionWithPayload.model';
import { Todo } from 'src/app/models/todo.model';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(() => {
    const storeStub = () => ({ dispatch: (todoAction: ActionWithPayload<Todo>) => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ListComponent],
      providers: [{ provide: Store, useFactory: storeStub }]
    });
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`addCard has default value`, () => {
    expect(component.addCard).toEqual(false);
  });
});
