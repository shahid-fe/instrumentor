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
  public eventsTableData: any = [];
  public visitorsData: any = [];
  public companyData: any = [];
  constructor(private eventTrackingDetailService: EventTrackingDetailService) {}

  ngOnInit(): void {
    this.eventTrackingDetailService.getEventsData().subscribe((res) => {
      console.log(res);
      this.eventsTableData = res[0];
      const graphData: { [key: string]: number } = {};
      this.eventsTableData.forEach((event: IEventData) => {
        const date: string = event.date;
        if (graphData[date]) {
          graphData[date]++;
        } else {
          graphData[date] = 1;
        }
      });
    });

    this.eventTrackingDetailService.getTopVisitor().subscribe((res) => {
      this.visitorsData = res;
    });

    this.eventTrackingDetailService.getTopCompanies().subscribe((res) => {
      this.companyData = res;
    });
  }
}
