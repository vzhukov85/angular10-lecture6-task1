import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Utm, UtmService, UtmDataSource } from 'src/app/utm.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  utmSource: FormControl = new FormControl();
  utmMedium: FormControl = new FormControl();
  utmCampaign: FormControl = new FormControl();
  utmContent: FormControl = new FormControl();
  utmTerm: FormControl = new FormControl();
  dataSource: Utm[];

  utmSourceIndex: string[];
  utmMediumIndex: string[];
  utmCampaignIndex: string[];
  utmContentIndex: string[];
  utmTermIndex: string[];

  utmSourceIndexVal = new FormControl();
  utmMediumIndexVal = new FormControl();
  utmCampaignIndexVal = new FormControl();
  utmContentIndexVal = new FormControl();
  utmTermIndexVal = new FormControl();

  displayedColumns = [
    'date', 'url', 'utm-source', 'utm-medium', 'utm-campaign', 'utm-content', 'utm-term'
  ]

  constructor(private router: Router, private utmSrv: UtmService) {
    this.updateDataSource(this.utmSrv.readData());
  }

  private updateDataSource(utmDataSource: UtmDataSource): void {
    this.dataSource = utmDataSource.utmDatasource;
    this.utmSourceIndex = utmDataSource.utmSourceIndex;
    this.utmMediumIndex = utmDataSource.utmMediumIndex;
    this.utmCampaignIndex = utmDataSource.utmCampaignIndex;
    this.utmContentIndex = utmDataSource.utmContentIndex;
    this.utmTermIndex = utmDataSource.utmTermIndex;
    this.filter();
  }

  ngOnInit(): void {
    const subject = this.utmSrv.subscribeToDataSource();
    subject.subscribe(dataSource => {
      this.updateDataSource(dataSource);
    });
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

  cleanUtm(): void {
    this.utmSrv.clean();
  }

  cleanFilter(): void {
    this.utmSourceIndexVal.setValue('');
    this.utmMediumIndexVal.setValue('');
    this.utmCampaignIndexVal.setValue('');
    this.utmContentIndexVal.setValue('');
    this.utmTermIndexVal.setValue('');
    this.updateDataSource(this.utmSrv.readData());
  }

  filter(): void {
    this.dataSource = this.utmSrv.readData().utmDatasource.filter(item => {
      let res = true;
      if (this.utmSourceIndexVal.value && this.utmSourceIndexVal.value !== '' &&
        item.utmSource !== this.utmSourceIndexVal.value) {
        res = false;
      }
      if (this.utmMediumIndexVal.value && this.utmMediumIndexVal.value !== '' &&
        item.utmMedium !== this.utmMediumIndexVal.value) {
        res = false;
      }
      if (this.utmCampaignIndexVal.value && this.utmCampaignIndexVal.value !== '' &&
        item.utmCampaign !== this.utmCampaignIndexVal.value) {
        res = false;
      }
      if (this.utmContentIndexVal.value && this.utmContentIndexVal.value !== '' &&
        item.utmContent !== this.utmContentIndexVal.value) {
        res = false;
      }
      if (this.utmTermIndexVal.value && this.utmTermIndexVal.value !== '' &&
        item.utmTerm !== this.utmTermIndexVal.value) {
        res = false;
      }
      return res;
    });
  }
}
