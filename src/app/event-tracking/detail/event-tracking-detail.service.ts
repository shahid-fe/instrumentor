import { Observable, of } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { ServerApi } from 'src/app/services/server-api';
import { IEventData } from './detail.component';
import { EVENT_DETAILS_MOCK_DATA_SEQUENTIAL } from './detail.mock';

@Injectable({
  providedIn: 'root',
})
export class EventTrackingDetailService {
  constructor(@Inject(ServerApi) private api: ServerApi) {}

  public getEventsData() {
    return of(EVENT_DETAILS_MOCK_DATA_SEQUENTIAL);
  }

  public getTopVisitor() {
    const visitors: any = {};
    EVENT_DETAILS_MOCK_DATA_SEQUENTIAL[0].forEach((x: any) => {
      if (visitors[x.userId]) {
        visitors[x.userId].count = visitors[x.userId].count + 1;
      } else {
        visitors[x.userId] = {
          count: 1,
          userId: x.userId,
          email: x.email,
        };
      }
    });
    return of(Object.values(visitors));
  }

  public getTopCompanies() {
    const companies: any = {};
    EVENT_DETAILS_MOCK_DATA_SEQUENTIAL[0].forEach((x: any) => {
      if (companies[x.companyId]) {
        companies[x.companyId].count = companies[x.companyId].count + 1;
      } else {
        companies[x.companyId] = {
          count: 1,
          companyId: x.companyId,
          companyName: x.companyName,
          userId: x.userId,
          email: x.email,
        };
      }
    });
    return of(Object.values(companies));
  }
}
