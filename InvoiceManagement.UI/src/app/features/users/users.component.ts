import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface User {
  userId: string;
  username:string;
  role: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  isLoading: boolean = true;
  errormessage: string = '';
  

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userDetails();
  }

  userDetails(): void {
    this.authService.getUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
      },
      error: (error: any) => {
        this.errormessage = 'Failed to load users', error;
      }
      
    });
  }
}
