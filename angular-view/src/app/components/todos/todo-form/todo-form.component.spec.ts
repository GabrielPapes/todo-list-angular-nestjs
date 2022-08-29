import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TodoFormComponent } from './todo-form.component';
import { Todo } from 'src/app/models/todo.model';
import ActionWithPayload from 'src/app/models/actionWithPayload.model';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  beforeEach(() => {
    const matDialogRefStub = () => ({ close: () => ({}) });
    const actionsStub = () => ({
      pipe: (arg: any, arg1: any) => ({ subscribe: (f: any) => f({}) })
    });
    const storeStub = () => ({ dispatch: (todoAction: ActionWithPayload<Todo>) => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TodoFormComponent],
      providers: [
        { provide: MatDialogRef, useFactory: matDialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: Actions, useFactory: actionsStub },
        { provide: Store, useFactory: storeStub }
      ]
    });
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`toggleEdit has default value`, () => {
    expect(component.toggleEdit).toEqual(false);
  });

  describe('onSubmit', () => {
    it('makes expected calls', () => {
      const storeStub: Store = fixture.debugElement.injector.get(Store);
      spyOn(storeStub, 'dispatch').and.callThrough();
      component.onSubmit();
      expect(storeStub.dispatch).toHaveBeenCalled();
    });
  });

  describe('onDelete', () => {
    it('makes expected calls', () => {
      const matDialogRefStub: MatDialogRef<TodoFormComponent> = fixture.debugElement.injector.get(
        MatDialogRef
      );
      const storeStub: Store = fixture.debugElement.injector.get(Store);
      spyOn(matDialogRefStub, 'close').and.callThrough();
      spyOn(storeStub, 'dispatch').and.callThrough();
      component.onDelete();
      expect(matDialogRefStub.close).toHaveBeenCalled();
      expect(storeStub.dispatch).toHaveBeenCalled();
    });
  });
});
