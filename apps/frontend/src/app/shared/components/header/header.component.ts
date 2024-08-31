import {Component, OnInit, signal, Type, WritableSignal} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  public title: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private currentTitle: Title
    ) {}

  async ngOnInit() {
    setTimeout(() => {
      this.title = this.currentTitle.getTitle()
    }, 200);
  }

  reload() {
    setTimeout(() => {
      this.title = this.currentTitle.getTitle()
    });
  }
}
