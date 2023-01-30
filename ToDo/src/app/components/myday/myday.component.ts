import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Todo } from 'src/app/interfaces/todo.interface';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-myday',
  templateUrl: './myday.component.html',
  styleUrls: ['./myday.component.scss'],
})
export class MydayComponent implements OnInit {
  formTodo: FormGroup;
  // status: boolean = false;

  constructor(private todoService: TodoService, private router: Router) {
    this.formTodo = new FormGroup({
      title: new FormControl(),
      category: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      console.log(todos);
    });
  }
  async logOut() {
    const response = await this.todoService.logOut();
    this.router.navigate(['/home']);
  }

  async addTodo() {
    const newTodo = {
      title: this.formTodo.value.title,
      category: this.formTodo.value.category,
      status: false,
    };
    const response = await this.todoService.addTodo(newTodo);
    console.log(response);
  }
}
