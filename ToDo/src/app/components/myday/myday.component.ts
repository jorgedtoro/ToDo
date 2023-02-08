import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { List } from 'src/app/interfaces/list.interface';
import { Todo } from 'src/app/interfaces/todo.interface';
import { AuthorizationsService } from 'src/app/services/authorizations.service';
import { ListsService } from 'src/app/services/lists.service';
import { TodoService } from 'src/app/services/todo.service';

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
  fillactive: boolean = false;
  iconClass= new Map<any, boolean>();

  // status: boolean = false;

  constructor(
    private todoService: TodoService,
    private authService:AuthorizationsService,
    private listsService:ListsService,
    private router: Router
    
    ) {
    this.formTodo = new FormGroup({
      title: new FormControl(),
      category: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.arrTodos = todos;
      // console.log(this.arrTodos);
    });
    this.listsService.getLists().subscribe((lists) => {
      this.arrLists = lists;
      // console.log(this.arrLists);
    });
      for (let i = 0; i < this.arrTodos.length; ++i) {
        this.iconClass.set(this.arrTodos[i].id, false);
      } 
  }

  onClick(id: any, event:any) {
    this.iconClass.set(id, !this.iconClass.get(id));
    this.addTodoFavourite(event);
    
  }
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
  //TODO: modificar el parámetro, recibir id y favourite
  async addTodoFavourite(event: any) {
    const pId = event.target.id;
    const favourite = true;
    console.log(event);
   
    try {
      const response = await this.todoService.updateTodo(pId, favourite);
      // console.log(response);
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
