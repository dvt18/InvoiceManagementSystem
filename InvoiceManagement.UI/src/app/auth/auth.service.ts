import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

interface User {
  id: string;
  username: string;
  role: string;
}

interface LoginResponse {
  token: string;
  role: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5139/api';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): 
    Observable<LoginResponse> {
      return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, {
        username,
        password
      });
  }

  register(username: string, password: string, role: string): 
    Observable<any> {
      return this.http.post(`${this.apiUrl}/auth/register`, {
        username,
        password,
        role
      });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // register(user: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/register`, user);
  // }

  // getUserRole(): string | null {
  //   return localStorage.getItem('role');
  // }

  // isAdmin(): boolean {
  //   return localStorage.getItem('role') === 'Admin';
  // }

  getUsers(): Observable<any> {
    return this.http.get<User[]>(`${this.apiUrl}/Users`);
  }
}
