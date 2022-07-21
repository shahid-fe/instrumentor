import { Observable, of } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { ServerApi } from 'src/app/services/server-api';
import { IEeventData } from './detail.component';
import { EVENT_DETAILS_MOCK_DATA } from './detail.mock';

@Injectable({
  providedIn: 'root'
})
export class EventTrackingDetailService {

  constructor(@Inject(ServerApi) private api: ServerApi) { }

  public getEventsData(): Observable<IEeventData[]> {
    return of(EVENT_DETAILS_MOCK_DATA)
  }
}
