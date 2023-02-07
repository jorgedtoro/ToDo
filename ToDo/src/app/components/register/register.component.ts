import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationsService } from 'src/app/services/authorizations.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formReg: FormGroup;

  constructor(private authService:AuthorizationsService, private router: Router) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    try {
      const response = await this.authService.register(this.formReg.value);
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }
}
