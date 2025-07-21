import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SidenavComponent } from "../sidenav/sidenav.component";
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [UpperCasePipe, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  username: string = '';
  pageTitle: string = 'Invoice Management System';
  
  @ViewChild(SidenavComponent) sidenavComponent!: SidenavComponent;

  // private routeTitleMap: { [key: string]: string } = {
  //   '/invoices': 'Invoices',
  //   '/users': 'Users',
  //   '/clients': 'Clients',
  //   '/projects': 'Projects',
  //   '/payments': 'Payments',
  // };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setUsername();
    // this.setupPageTitleListener();
  }

  ngAfterViewInit() {}

  setUsername(): void {
    const user = localStorage.getItem('username');
    this.username = user ? user : 'User';
  }

  // setupPageTitleListener(): void {
  //   this.router.events
  //     .pipe(filter(event => event instanceof NavigationEnd))
  //     .subscribe((event: any) => {
  //       const route = event.urlAfterRedirects || event.url;
  //       this.pageTitle = this.routeTitleMap[route] || 'Invoice Management System';
  //     });
  // }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}

