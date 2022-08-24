import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Actions } from '@ngrx/effects';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    const actionsStub = () => ({
      pipe: (arg: any) => ({}),
    });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService, { provide: Actions, useFactory: actionsStub }]
    });
    service = TestBed.inject(TodoService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
