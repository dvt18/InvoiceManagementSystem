import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { RoleService } from '../../../core/services/role.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {
  @Input() collapsed = false;
  @Output() toggle = new EventEmitter<boolean>();
  
  isAdmin!: boolean;


  constructor(private authService: AuthService, private roleService: RoleService) {}

  toggleSidenav() {
    this.collapsed = !this.collapsed;
    this.toggle.emit(this.collapsed);
  }

  ngOnInit(): void {
    this.isAdmin = this.roleService.isAdmin();
  }

}
