import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { ServerApi } from 'src/app/services/server-api';
import { IEventData } from './detail.component';
import { EVENT_DETAILS_MOCK_DATA_SEQUENTIAL } from './detail.mock';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EventTrackingDetailService {
  constructor(
    @Inject(ServerApi) private api: ServerApi,
    private http: HttpClient
  ) {}

  public getEventsData() {
    return of(this.transformData(EVENT_DETAILS_MOCK_DATA_SEQUENTIAL));
  }

  public getAllEventsData() {
    return this.http
      .get(
        'http://seven-months-film-101-50-109-15.loca.lt/api/w2/instrumentor_event_details'
      )
      .pipe(map(this.transformData.bind(this)));
  }

  public getTopVisitor(data: any) {
    const visitors: any = {};
    data.forEach((x: any) => {
      if (visitors[x.userId]) {
        visitors[x.userId].count = visitors[x.userId].count + 1;
      } else {
        visitors[x.userId] = {
          count: 1,
          userId: x.userId,
        };
      }
    });
    return of(Object.values(visitors));
  }

  public getTopCompanies(data: any) {
    const companies: any = {};
    data.forEach((x: any) => {
      if (companies[x.companyId]) {
        companies[x.companyId].count = companies[x.companyId].count + 1;
      } else {
        companies[x.companyId] = {
          count: 1,
          companyId: x.companyId,
          userId: x.userId,
          email: x.email,
        };
      }
    });
    return Object.values(companies);
  }

  public transformData(data: any) {
    const eventsData =  data.map((x: any) => {
      return {
        ...x.instrumentor_event_detail,
      };
    });

    const topCompanies = this.getTopCompanies(eventsData);

    const topVisitors = this.getTopVisitor(eventsData);

    return {
      eventsData,
      topCompanies,
      topVisitors,
    }
  }
}
