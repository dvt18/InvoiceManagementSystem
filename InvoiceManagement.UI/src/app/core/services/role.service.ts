import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RoleService {
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isAdmin(): boolean {
    return this.getRole() === 'Admin';
  }

  isUser(): boolean {
    return this.getRole() === 'User';
  }
}