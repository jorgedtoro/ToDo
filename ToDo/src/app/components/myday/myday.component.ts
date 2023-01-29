import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-myday',
  templateUrl: './myday.component.html',
  styleUrls: ['./myday.component.scss'],
})
export class MydayComponent implements OnInit {
  constructor(private todoService: TodoService, private router: Router) {}

  ngOnInit(): void {}
  async logOut() {
    const response = await this.todoService.logOut();
    this.router.navigate(['/home']);
  }
}
