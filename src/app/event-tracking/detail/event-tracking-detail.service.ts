import { Observable, of } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { ServerApi } from 'src/app/services/server-api';
import { IEventData } from './detail.component';
import { EVENT_DETAILS_MOCK_DATA_SEQUENTIAL } from './detail.mock';

@Injectable({
  providedIn: 'root'
})
export class EventTrackingDetailService {

  constructor(@Inject(ServerApi) private api: ServerApi) { }

  public getEventsData() {
    return of(EVENT_DETAILS_MOCK_DATA_SEQUENTIAL)
  }
}
