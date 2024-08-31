import { Routes } from '@angular/router';
import {HomeComponent} from "./views/home/home.component";
import {ArchivesComponent} from "./views/archives/archives.component";

const routeTitlePrefix = 'DMS - ';

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
    data: { title: 'Archives' }
  }
];
