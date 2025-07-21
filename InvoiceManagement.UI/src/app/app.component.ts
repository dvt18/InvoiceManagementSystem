import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/layout/header/header.component";
import { CommonModule } from '@angular/common';
import { SidenavComponent } from "./shared/layout/sidenav/sidenav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements AfterViewInit {
  sidenavCollapsed = false;

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  constructor(private router: Router) {} 

  ngAfterViewInit(): void {}

  showHeader(): boolean {
    return this.router.url !== '/login' && this.router.url !== '/register';
  }

}
