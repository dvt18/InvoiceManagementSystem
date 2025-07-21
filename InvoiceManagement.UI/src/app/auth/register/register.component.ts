import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['User']
    });
  }

  register() {
    if (this.registerForm.invalid) {
      return;
    }

    const { username, password, role } = this.registerForm.value;

    this.auth.register(username, password, role).subscribe({
      next: (res) => {
        this.successMessage = "Registration successful! Please log in.";
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.errorMessage = "Registration failed. User already exist.";
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }

  backToLogin(): void {
    this.router.navigate(['/login']);
  }
}

