import { Component, OnInit } from '@angular/core';
import { EventTrackingDetailService } from './event-tracking-detail.service';

export interface IEeventData {
  date: string;
  cameraType: string;
  eventId: string;
  timeSinceLastUpload: string;
  eventType: string;
  vehicleId: number;

  companyId: string;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  public eventsTableData: IEeventData[] = [];
  constructor(private eventTrackingDetailService: EventTrackingDetailService) {}

  ngOnInit(): void {
    this.eventTrackingDetailService.getEventsData().subscribe((res) => {
      this.eventsTableData = res;
    });
  }
}
