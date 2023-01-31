import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/interfaces/list.interface';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  // images: string[] = [];
  avatar: string = '';
  listTitle: string = '';
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    // this.getAvatar();
  }

  // async getAvatar() {
  //   const images = await this.todoService.getImages();
  // }

  addList(title: string) {
    this.listTitle = title;
    console.log(this.listTitle);
    // const newList: List = { title: 'hola' };
    // try {
    //   const response = await this.todoService.addList(newList);
    // } catch (error) {
    //   console.log(error);
    // }
  }
}
