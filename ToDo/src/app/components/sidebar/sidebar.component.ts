import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  // images: string[] = [];
  avatar: string = '';
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getAvatar();
  }

  async getAvatar() {
    const images = await this.todoService.getImages();
    console.log(images);
  }
}
