import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  password: string = '';
  username: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/books'])
        } else {
          console.log("Error")
        }
      },
      (error) => {
        console.log(error)
      }
    );
  }
  
}