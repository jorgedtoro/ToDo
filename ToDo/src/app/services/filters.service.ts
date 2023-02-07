import { Injectable } from '@angular/core';
import { TodoService } from './todo.service';
import { Todo } from '../interfaces/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  arrTodos:Todo[]=[];

  constructor(
    private todoService:TodoService
  ) { }


  

}
