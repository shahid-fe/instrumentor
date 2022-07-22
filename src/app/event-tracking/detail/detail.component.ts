import { Component, OnInit } from '@angular/core';
import { EventTrackingDetailService } from './event-tracking-detail.service';

export interface IEventData {
  date: string;
  cameraType: string;
  id: number;
  timeSinceUpload: string;
  type: string;
  vehicleId: number;
  userId: number;
  companyId: number;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  public eventsTableData: any;
  constructor(private eventTrackingDetailService: EventTrackingDetailService) {}

  ngOnInit(): void {
    this.eventTrackingDetailService.getEventsData().subscribe((res) => {
      this.eventsTableData = res;
    });
  }
}
