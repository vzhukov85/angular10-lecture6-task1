import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UtmService } from '../utm.service';

@Component({
  selector: 'grab-utm',
  template: '',
  styles: [],
  providers: [
    DatePipe
  ]
})
export class GrabUtmComponent implements OnInit {
  order: string;
  constructor(private router: Router, private activeRoute: ActivatedRoute, private utmSrv: UtmService) {}

  ngOnInit(): void {
    this.activeRoute.queryParamMap.subscribe((params: ParamMap) => {
      this.utmSrv.grabUtm(params, this.router.url);
    });
  }
}
