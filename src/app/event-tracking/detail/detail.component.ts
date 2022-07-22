import { Component, OnInit } from '@angular/core';
import { EventTrackingDetailService } from './event-tracking-detail.service';
import { Chart } from 'chart.js';

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
  private chart: any;
  public chartData: any = [];
  private graphTotals: {[key: string]: number} = {};
  public chartOptions =  {
    responsive: true, // Instruct chart js to respond nicely.
    maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
  }
  constructor(private eventTrackingDetailService: EventTrackingDetailService) {}

  ngOnInit(): void {
    this.eventTrackingDetailService.getEventsData().subscribe((res: any) => {
      console.log(res);
      this.eventsTableData = res[0];
      this.eventsTableData.forEach((event: IEventData) => {
        const date: string = event.date;
        if (this.graphTotals[date]) {
          this.graphTotals[date]++;
        } else {
          this.graphTotals[date] = 1;
        }
      });
      Object.keys(this.graphTotals).forEach((date: string) => {
        this.chartData.push({date, events: this.graphTotals[date]});
      });
    });
    console.log('graph Data', this.chartData)
    this.drawChart();
  }

  private drawChart() {
    var canvas = <HTMLCanvasElement>document.getElementById("rohsProductSummaryChart");
    var ctx = canvas.getContext("2d");

  }
}
