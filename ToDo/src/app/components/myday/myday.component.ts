import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { List } from 'src/app/interfaces/list.interface';
import { Todo } from 'src/app/interfaces/todo.interface';
import { AuthorizationsService } from 'src/app/services/authorizations.service';
import { ListsService } from 'src/app/services/lists.service';
import { TodoService } from 'src/app/services/todo.service';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-myday',
  templateUrl: './myday.component.html',
  styleUrls: ['./myday.component.scss'],
})
export class MydayComponent implements OnInit {
  formTodo: FormGroup;
  arrTodos: Todo[] = [];
  arrLists: List[] = [];
  modalList: boolean = false;
  date = new Date();
  formatDate:string='';
  // iconClass= new Map<any, boolean>();
  

  constructor(
    private todoService: TodoService,
    private authService:AuthorizationsService,
    private listsService:ListsService,
    private router: Router, private MatNativeDateModule:MatNativeDateModule
    
    ) {
    this.formTodo = new FormGroup({
      title: new FormControl(),
      category: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.arrTodos = todos;
      
    });
    this.listsService.getLists().subscribe((lists) => {
      this.arrLists = lists;
      
    });

    this.date.toLocaleDateString();
    this.formateDate(this.date, 'dd/mm/yy');
    console.log(this.formatDate);
      // for (let i = 0; i < this.arrTodos.length; ++i) {
      //   this.iconClass.set(this.arrTodos[i].id, false);
      // } 
  }

  formateDate(date:Date, format:string){
    const map:any = {
      dd: date.getDate(),
      mm: date.getMonth() + 1,
      yy: date.getFullYear().toString().slice(-2),
      yyyy: date.getFullYear()
    };
    this.formatDate = format.replace(/mm|dd|yy|yyy/gi, matched => map[matched])
  }
  // onClick(id: any, favourite:boolean) {
  //   // this.iconClass.set(id, !this.iconClass.get(id));
  //   this.addTodoFavourite(event);
    
  // }
  async logOut() {
    const response = await this.authService.logOut();
    this.router.navigate(['/home']);
  }

  async addTodo() {
    const newTodo = {
      title: this.formTodo.value.title,
      category: this.formTodo.value.category,
      status: false,
      favourite: false,
      list: 'Tareas',
    };
    try {
      const response = await this.todoService.addTodo(newTodo);
      //reset the forms values
      this.formTodo.reset();
    } catch (error) {
      console.log(error);
    }
  }
  async getAllTodos() {
    try {
      const response = await this.todoService.getTodos();
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  
  async addTodoFavourite(event:any, favourite:boolean) {
    const pId = event.target.id;
    
    try {
      const response = await this.todoService.updateTodo(pId, favourite);
      
    } catch (error) {
      console.log(error);
    }
  }
  async deleteTodo(event: any) {
    try {
      const pId: string = event.target.id;
      const response = await this.todoService.deleteTodo(pId);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async getLists() {
    try {
      const response = this.listsService.getLists();
    } catch (error) {
      console.log(error);
    }
  }

  filterByCategory(){
    this.arrTodos.filter((todo)=>{
      todo.category == this.todoService.listTitle;
    });
    
  }
}
