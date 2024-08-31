import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-archives',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './archives.component.html',
  styleUrl: './archives.component.scss'
})
export class ArchivesComponent {

    protected readonly Math = Math;
}
