import { Component } from '@angular/core';
import {
  ActivatedRoute,
  Route,
  Router,
  RoutesRecognized,
} from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { router as fullRouterLink } from '../app-router.module';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css'],
})
export class NavigateComponent {
  previousUrl: string[] = [];
  currentIndex: number;
  routerNames: Map<string, string> = new Map();
  historyDeep = 5;
  constructor(private router: Router, private route: ActivatedRoute) {
    fullRouterLink.forEach((item: Route) => {
      if (item.data && 'title' in item.data) {
        this.routerNames.set(item.path, item.data.title);
      }
    });

    this.router.events
      .pipe(
        filter((evt: any) => evt instanceof RoutesRecognized),
        pairwise()
      )
      .subscribe((events: RoutesRecognized[]) => {
        const prev = this.getUrlOnly(events[0].urlAfterRedirects.toString());
        const curr = this.getUrlOnly(events[1].urlAfterRedirects.toString());
        if (this.previousUrl.length === 0) {
          this.previousUrl.push(this.prepareUrl(prev));
          this.currentIndex = this.previousUrl.length - 1;
        }
        if (
          !curr.endsWith('#') &&
          prev !== curr &&
          this.previousUrl[this.currentIndex] !== curr
        ) {
          this.previousUrl = this.previousUrl.slice(0, this.currentIndex + 1);
          this.previousUrl.push(curr);
          this.previousUrl = this.previousUrl.slice(
            Math.max(this.previousUrl.length - this.historyDeep, 0)
          );
          this.currentIndex = this.previousUrl.length - 1;
        } else if (
          !curr.endsWith('#') &&
          (prev === curr || this.previousUrl[this.currentIndex] === curr)
        ) {
          this.previousUrl = this.previousUrl.slice(0, this.currentIndex + 1);
          this.currentIndex = this.previousUrl.length - 1;
        }
      });
  }

  private prepareUrl(path: string): string {
    if (path.startsWith('/')) {
      path = path.substring(1);
    }
    if (path.endsWith('#')) {
      path = path.substring(0, path.length - 1);
    }
    return path;
  }

  private getUrlOnly(path: string): string {
    if (path.startsWith('/')) {
      path = path.substring(1);
    }
    if (path.indexOf('?') >= 0) {
      path = path.substring(0, path.indexOf('?'));
    }
    return path;
  }

  back(): void {
    if (this.currentIndex === 0) {
      return;
    } else if (this.currentIndex < 0) {
      this.currentIndex = 0;
      return;
    }
    this.currentIndex--;
    const path = this.previousUrl[this.currentIndex] + '#';
    this.router.navigateByUrl(path, { relativeTo: this.route });
  }

  forward(): void {
    if (this.currentIndex === this.previousUrl.length - 1) {
      return;
    } else if (this.currentIndex > this.previousUrl.length - 1) {
      this.currentIndex = this.previousUrl.length - 1;
      return;
    }
    this.currentIndex++;
    const path = this.previousUrl[this.currentIndex] + '#';
    this.router.navigateByUrl(path, { relativeTo: this.route });
  }

  select(i: number): void {
    this.currentIndex = i;
    const path = this.previousUrl[this.currentIndex] + '#';
    this.router.navigateByUrl(path, { relativeTo: this.route });
  }

  get urls(): { [name: string]: any } {
    const res = [];
    this.previousUrl.forEach((item, index) => {
      res.push({
        url: item + '#',
        title: this.routerNames.get(item),
        color:
          index === this.currentIndex
            ? 'rgba(255, 255, 255, 0.04)'
            : 'rgba(255, 255, 255, 0)',
      });
    });
    return res;
  }

  hasNext(i: number): boolean {
    if (i < this.previousUrl.length - 1) {
      return true;
    }
    return false;
  }
}
