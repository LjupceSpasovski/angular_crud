import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BookComponent } from './components/book/book.component';
import { AuthGuard } from './guards/auth.guard';
import { authReverseGuard } from './guards/auth-reverse.guard';

const routes: Routes = [
  { path: 'register', component: RegisterComponent, canActivate: [authReverseGuard] },
  { path: 'login', component: LoginComponent, canActivate: [authReverseGuard] },
  { path: 'books', component: BookComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
