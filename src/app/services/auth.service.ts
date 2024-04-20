import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    console.log({localStorage})
    if(localStorage.getItem('token')){
      return true
    }
    else{
      return false;
    }
  }

  register(username: string, password: string, email: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, {username, password, email});
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { username, password });
  }
}
