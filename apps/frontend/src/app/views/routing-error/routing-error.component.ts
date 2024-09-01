import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-routing-error',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './routing-error.component.html',
  styleUrl: './routing-error.component.scss'
})
export class RoutingErrorComponent {

}
