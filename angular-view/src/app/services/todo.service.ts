import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TodoDTO } from '../dto/todo.dto';

const SERVICE = 'todo'
const NEST_BACKEND = `${environment.NEST_BACKEND_IP}:${environment.NEST_BACKEND_PORT}/${SERVICE}` 

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getTodo(id: string): Observable<TodoDTO> {
    const UPDATED_URL = `${NEST_BACKEND}/${id}`;
    return this.httpClient.get<TodoDTO>(UPDATED_URL);
  }

  getAllTodos(): Observable<TodoDTO[]> {
    return this.httpClient.get<TodoDTO[]>(NEST_BACKEND);
  }

  createTodo(todo: TodoDTO) {
    return this.httpClient.post(NEST_BACKEND, todo);
  }

  updateTodo(id: string, todo: TodoDTO) {
    const UPDATED_URL = `${NEST_BACKEND}/${id}`;
    return this.httpClient.put(UPDATED_URL, todo);
  }

  deleteTodo(id: string) {
    const UPDATED_URL = `${NEST_BACKEND}/${id}`;
    return this.httpClient.delete(UPDATED_URL);
  }
  
}
