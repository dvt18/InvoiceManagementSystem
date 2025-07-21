import { Component } from '@angular/core';
import { SidenavComponent } from "../sidenav/sidenav.component";
import { HeaderComponent } from "../header/header.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [SidenavComponent, HeaderComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
collapsed: boolean = false;

}
