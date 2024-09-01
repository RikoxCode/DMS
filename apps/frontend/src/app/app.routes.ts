import { Routes } from '@angular/router';
import {HomeComponent} from "./views/home/home.component";
import {ArchivesComponent} from "./views/archives/archives.component";
import {ArchiveListViewComponent} from "./views/archives/archive-list-view/archive-list-view.component";
import {RoutingErrorComponent} from "./views/routing-error/routing-error.component";

const routeTitlePrefix = 'DMS | ';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: routeTitlePrefix + 'Home',
    data: { title: 'Home' }
  },
  {
    path: 'archives',
    component: ArchivesComponent,
    title: routeTitlePrefix + 'Archives',
    data: { title: 'Archives' },
    children: [
      {
        path: ':slug',
        component: ArchiveListViewComponent,
      }
    ]
  },
  {
    path: '**',
    component: RoutingErrorComponent,
    title: routeTitlePrefix + 'Error',
  }
];
