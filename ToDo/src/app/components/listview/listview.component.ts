import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from 'src/app/interfaces/todo.interface';
import { FiltersService } from 'src/app/services/filters.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.scss']
})
export class ListviewComponent implements OnInit {
  arrTodos:Todo[]=[];
  category:string='';

  arrTodosCategory: Todo[]=[];

  constructor(
    private filterService:FiltersService,
    private todoService:TodoService,
    private activatedRoute:ActivatedRoute
    ) { }

  async ngOnInit(): Promise<any> {
    //route subscribe
    this.activatedRoute.params.subscribe((params:any)=>{
      this.category = params.nameList
      
    })
    await this.todoService.getTodos().subscribe(todos =>{
      this.arrTodos=todos;
      this.filterTodosByCategory(this.category)
      
    })
    // debugger;
    console.log(this.category); 
    
  }

  async filterTodosByCategory(category:string){
    // console.log(category);
    // console.log(this.arrTodos);
    try {
      this.arrTodosCategory = await this.arrTodos.filter((todo)=>{
      return todo.category == category;
    });
    // console.log(this.arrTodosCategory);
    return this.arrTodosCategory;
    } catch (error) {
      return console.log(error);
    }
    
    
  }

  
}
