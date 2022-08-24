import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { BoardComponent } from './board.component';
import { GetTodo } from 'src/app/states/todo.action';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(() => {
    const storeStub = () => ({
      pipe: (arg: any) => ({}),
      dispatch: (getTodoAction: GetTodo) => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [BoardComponent],
      providers: [{ provide: Store, useFactory: storeStub }]
    });
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const storeStub: Store = fixture.debugElement.injector.get(Store);
      spyOn(storeStub, 'dispatch').and.callThrough();
      component.todoState$ = new Observable();
      component.ngOnInit();
      expect(storeStub.dispatch).toHaveBeenCalled();
    });
  });
});
