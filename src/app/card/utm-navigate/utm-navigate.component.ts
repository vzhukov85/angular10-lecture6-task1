import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'utm-navigate',
  templateUrl: './utm-navigate.component.html',
  styleUrls: ['./utm-navigate.component.css']
})
export class UtmNavigateComponent implements OnInit {
  utmSource: FormControl = new FormControl();
  utmMedium: FormControl = new FormControl();
  utmCampaign: FormControl = new FormControl();
  utmContent: FormControl = new FormControl();
  utmTerm: FormControl = new FormControl();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  sendUtm(): void {
    console.log(this.utmSource);
    this.router.navigate(['/home'], {
      queryParams: {
        umt_source: this.utmSource.value ,
        utm_medium: this.utmMedium.value,
        utm_campaign: this.utmCampaign.value,
        utm_content: this.utmContent.value,
        utm_term: this.utmTerm.value
      },
    });
  }
}
