import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { ParamMap } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';


export interface Utm {
  date: string;
  url: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
}

export interface UtmDataSource {
  utmSourceIndex: string[];
  utmMediumIndex: string[];
  utmCampaignIndex: string[];
  utmContentIndex: string[];
  utmTermIndex: string[];
  utmDatasource: Utm[];
}

@Injectable({
  providedIn: 'root',
})
export class UtmService {
  storageName = 'utmDataSource';
  subjects: BehaviorSubject<UtmDataSource>[] = [];

  constructor(private datePipe: DatePipe) { }

  subscribeToDataSource(): BehaviorSubject<UtmDataSource> {
    const subject = new BehaviorSubject<UtmDataSource>(this.readData());
    this.subjects.push(subject);
    return subject;
  }

  grabUtm(params: ParamMap, url: string): void {
    if (
      params.has('utm_medium') ||
      params.has('umt_source') ||
      params.has('utm_campaign') ||
      params.has('utm_content') ||
      params.has('utm_term')
    ) {
      const utmSource = this.getValOrDef(params, 'umt_source');
      const utmMedium = this.getValOrDef(params, 'utm_medium');
      const utmCampaign = this.getValOrDef(params, 'utm_campaign');
      const utmContent = this.getValOrDef(params, 'utm_content');
      const utmTerm = this.getValOrDef(params, 'utm_term');
      const date = this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss.SSS');
      const utm: Utm = {date, url, utmSource, utmMedium, utmCampaign, utmContent, utmTerm};
      const obj: UtmDataSource = this.readData();
      obj.utmDatasource = [utm].concat(obj.utmDatasource);
      this.addToIndex(utmSource, obj.utmSourceIndex);
      this.addToIndex(utmMedium, obj.utmMediumIndex);
      this.addToIndex(utmCampaign, obj.utmCampaignIndex);
      this.addToIndex(utmContent, obj.utmContentIndex);
      this.addToIndex(utmTerm, obj.utmTermIndex);
      this.saveToDataSource(obj);
      console.log(obj);
    }
  }

  private saveToDataSource(obj: UtmDataSource): void {
    localStorage.setItem(this.storageName, JSON.stringify(obj));
    this.subjects.forEach(subject => {
      subject.next(obj);
    });
  }

  readData(): UtmDataSource {
    let obj: UtmDataSource = JSON.parse(localStorage.getItem(this.storageName));
    if (!obj) {
      obj = {
        utmSourceIndex: [''],
        utmMediumIndex: [''],
        utmCampaignIndex: [''],
        utmContentIndex: [''],
        utmTermIndex: [''],
        utmDatasource: []
      };
    }
    return obj;
  }

  clean(): void {
    const obj = {
      utmSourceIndex: [''],
      utmMediumIndex: [''],
      utmCampaignIndex: [''],
      utmContentIndex: [''],
      utmTermIndex: [''],
      utmDatasource: []
    };
    this.saveToDataSource(obj);
  }

  private addToIndex(value: string, index: Array<string>): void {
    if (value !== '' && index.indexOf(value) < 0) {
      index.push(value);
    }
  }

  private getValOrDef(params: ParamMap, key: string): string {
    return params.has(key) ? params.get(key) : '';
  }
}
