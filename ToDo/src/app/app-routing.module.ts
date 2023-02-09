import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MydayComponent } from './components/myday/myday.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { ListviewComponent } from './components/listview/listview.component';
import { ImportantComponent } from './components/important/important.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainComponent },
  {
    path: 'myday',
    component: MydayComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/home'])),
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'listTodos/:nameList', component:ListviewComponent},
  { path: 'important', component:ImportantComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
