import {Component, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {SidebarComponent} from "./shared/components/sidebar/sidebar.component";
import {HeaderComponent} from "./shared/components/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  @ViewChild(HeaderComponent) headerComponent: HeaderComponent | null = null;

  getHeader() {
    return this.headerComponent;
  }
}
