import { Component } from '@angular/core';
import {
  Route,
  Router,
  Routes
} from '@angular/router';
import { router as fullRouterLink } from './app-router.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  routes: Route[] = [];
  constructor(private router: Router) {
    fullRouterLink.forEach((item: Route) => {
      if (item.data && 'title' in item.data) {
        this.routes.push(item);
      }
    });
  }

  get routerLink(): Routes {
    return this.routes;
  }

}
