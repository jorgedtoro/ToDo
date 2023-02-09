import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/interfaces/todo.interface';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-important',
  templateUrl: './important.component.html',
  styleUrls: ['./important.component.scss']
})
export class ImportantComponent implements OnInit {
  arrTodos:Todo[];
  arrTodosImportant:Todo[]=[];

  constructor(
    private todosService:TodoService) { 
    this.arrTodosImportant = [];
    this.arrTodos = [];
  }

  ngOnInit(): void {
    this.todosService.getTodos().subscribe((todo) => {
      this.arrTodos = todo;
      this.filterImportantTodo();
      
    });
  }

  filterImportantTodo(){
    
      this.arrTodosImportant = this.arrTodos.filter((todo)=>{
        return todo.favourite === true;
        
      })
    
    
  }
  async deleteTodo(event:any){
    try {
      const pId = event.target.id;
      await this.todosService.deleteTodo(pId);
      
    } catch (error) {
      console.log(error);
    }

  }
}
