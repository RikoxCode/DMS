import {Component, inject, Input, ViewChild} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatIcon,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() headerComponent: HeaderComponent | null = null;

  constructor(
    private router: Router
  ) { }

  reloadHeader(link: string) {
    this.router.navigate([link]);
    setTimeout(() => {
      this.headerComponent!.reload();
    }, 10);
  }
}
