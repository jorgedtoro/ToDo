import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/interfaces/list.interface';
import { Todo } from 'src/app/interfaces/todo.interface';
import { ListsService } from 'src/app/services/lists.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  // images: string[] = [];
  // avatar: string = '';
  listTitle: string = '';
  listTitleEmit:string='Tareas';

  arrList: List[] = [];
  modalList: boolean = false;
  left: number = 0;
  right: number = 0;
  arrTodos:Todo[]=[];

  constructor(
    private todoService: TodoService,
    private listsService:ListsService
    ) {}

  ngOnInit(): void {
    this.listsService.getLists().subscribe((lists) => {
      this.arrList = lists;
      // console.log(this.arrList);
    });
    this.todoService.getTodos().subscribe(todos =>{
      this.arrTodos=todos;
      // console.log(this.arrTodos)
    })
    
  }

  // async getAvatar() {
  //   const images = await this.todoService.getImages();
  // }

  async addList(title: string) {
    this.listTitle = title;
    // console.log(this.listTitle);
    try {
      const response = await this.listsService.addList({
        title: this.listTitle,
      });
      this.listTitle = '';
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
  deleteList(event: any) {
    try {
      const id = event.target.id;
      this.listsService.deleteList(id);
    } catch (error) {
      console.log(error);
    }
  }

  filterByCategory(title: string) {
    console.log(title);
    console.log(this.arrTodos);
    const arrTodosFilter = this.arrTodos.filter((todo)=>{
      return todo.category == title;
    });
    return arrTodosFilter
  }

  showModallist(event: any) {
    this.left = event.pageX + 10;
    this.right = event.pageY;
    console.log(this.left, this.right);

    event?.preventDefault();
    this.modalList = !this.modalList;
  }
  addCategory(title:string){
    this.listTitleEmit = title;
  }
}
