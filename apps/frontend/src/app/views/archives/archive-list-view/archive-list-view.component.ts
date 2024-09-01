import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-archive-list-view',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './archive-list-view.component.html',
  styleUrl: './archive-list-view.component.scss'
})
export class ArchiveListViewComponent implements OnInit{

  protected readonly Math = Math;

  constructor(
    private title: Title,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.setTitles();
  }

  async setTitles() {
    const slug = await this.route.paramMap.subscribe(params => {
      return params.get('slug')!;
    });

    console.log();

    this.title.setTitle('Archive - ');
  }
}
