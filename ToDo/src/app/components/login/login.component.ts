import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationsService } from 'src/app/services/authorizations.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLog: FormGroup;

  constructor(
    private authService:AuthorizationsService,
    private router: Router
    ) {
    this.formLog = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    try {
      const response = await this.authService.login(this.formLog.value);
      // console.log(response);
      this.router.navigate(['/myday']);
    } catch (error) {
      console.log(error);
    }
  }
  async onGoogle() {
    const response = await this.authService.loginWithGoogle();
    // console.log(response);
    this.router.navigate(['/myday']);
  }
}
