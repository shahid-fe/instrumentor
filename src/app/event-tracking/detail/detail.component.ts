import { Component, OnInit } from '@angular/core';
import { EventTrackingDetailService } from './event-tracking-detail.service';
// import {Chart } from 'chart.js';
import Chart from 'chart.js/auto'
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

  public chartData: any = [];
  private graphTotals: { [key: string]: number } = {};
  private canvas: any;
  private ctx: any;
  public chartOptions = {
    responsive: true, // Instruct chart js to respond nicely.
    maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
  };
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
        this.chartData.push({ date, events: this.graphTotals[date] });
      });
    });

    this.eventTrackingDetailService.getTopVisitor().subscribe((res) => {
      this.visitorsData = res;
    });

    this.eventTrackingDetailService.getTopCompanies().subscribe((res) => {
      this.companyData = res;
    });

    this.drawChart();
  }

  private drawChart() {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    var gradient = this.ctx.createLinearGradient(0, 0, 0, 280);
    gradient.addColorStop(0, 'rgba(239,43,114,1)');   
    gradient.addColorStop(1, 'rgba(239,43,114,0)');
    let myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: ['Angular 11', 'Angular 10', 'Angular 9'],
        datasets: [
          {
            label: 'Active Angular Vesrions',
            data: [85, 100, 60],
            borderWidth: 1,
            borderColor: '#ffb1c1',
            backgroundColor: gradient,
            type: 'line',
            order: 0,
          },
        ],
      },
    });
  }
}
