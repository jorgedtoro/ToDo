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
  // avatar: string = '';
  listTitle: string = '';
  arrList: List[] = [];
  modalList: boolean = false;
  left: number = 0;
  right: number = 0;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getLists().subscribe((lists) => {
      this.arrList = lists;
      // console.log(this.arrList);
    });
  }

  // async getAvatar() {
  //   const images = await this.todoService.getImages();
  // }

  async addList(title: string) {
    this.listTitle = title;
    // console.log(this.listTitle);
    try {
      const response = await this.todoService.addList({
        title: this.listTitle,
      });
      this.listTitle = '';
    } catch (error) {
      console.log(error);
    }
  }
  async getLists() {
    try {
      const response = this.todoService.getLists();
    } catch (error) {
      console.log(error);
    }
  }
  deleteList(event: any) {
    try {
      const id = event.target.id;
      this.todoService.deleteList(id);
    } catch (error) {
      console.log(error);
    }
  }

  filterByCategory(title: string | any) {
    console.log(title);
  }

  showModallist(event: any) {
    this.left = event.pageX + 10;
    this.right = event.pageY;
    console.log(this.left, this.right);

    event?.preventDefault();
    this.modalList = !this.modalList;
  }
}
