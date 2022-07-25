import { SAFETY_EVENT_TRACK } from './../list/list.component';
import { ActivatedRoute } from '@angular/router';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { EventTrackingDetailService } from './event-tracking-detail.service';
// import {Chart } from 'chart.js';
import Chart from 'chart.js/auto';
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
  providers: [EventTrackingDetailService],
})
export class DetailComponent implements OnInit {
  public eventsTableData: any = [];
  public visitorsData: any = [];
  public companyData: any = [];
  public isLoading = false;
  public title: SAFETY_EVENT_TRACK = SAFETY_EVENT_TRACK.OPENED;
  private graphTotals: { [key: string]: number } = {};
  private canvas: any;
  private ctx: any;
  public chartOptions = {
    responsive: true, // Instruct chart js to respond nicely.
    maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
  };
  constructor(
    @Inject(EventTrackingDetailService)
    private eventTrackingDetailService: EventTrackingDetailService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const params = this.activateRoute.snapshot.params;
    this.isLoading = true;
    this.title = params?.event || SAFETY_EVENT_TRACK.OPENED;
    this.eventTrackingDetailService
      .getAllEventsData(this.title)
      .subscribe((res: any) => {
        this.isLoading = false;
        this.eventsTableData = res.eventsData;
        this.companyData = res.topCompanies;
        this.visitorsData = res.topVisitors;

        this.eventsTableData.forEach((event: any) => {
          const date: string = event.date;
          if (!date) return;
          if (this.graphTotals[date]) {
            this.graphTotals[date]++;
          } else {
            this.graphTotals[date] = 1;
          }
        });

        this.drawChart();
      });

    this.eventTrackingDetailService.getTopVisitor(this.visitorsData);

    this.eventTrackingDetailService.getTopCompanies(this.companyData);
  }

  private drawChart() {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    var gradient = this.ctx.createLinearGradient(0, 0, 0, 280);
    gradient.addColorStop(0, 'rgba(239,43,114,1)');
    gradient.addColorStop(1, 'rgba(239,43,114,0)');

    let chartStatus = Chart.getChart('myChart'); // <canvas> id
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }
    this.isLoading = false;

    let myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: Object.keys(this.graphTotals),
        datasets: [
          {
            label: 'Total Events',
            data: Object.values(this.graphTotals),
            backgroundColor: '#80b6f4',
            type: 'line',
            order: 0,
            borderColor: '#80b6f4',
            pointBorderColor: '#80b6f4',
            pointBackgroundColor: '#80b6f4',
            pointHoverBackgroundColor: '#80b6f4',
            pointHoverBorderColor: '#80b6f4',
            pointBorderWidth: 10,
            pointHoverRadius: 10,
            pointHoverBorderWidth: 1,
            pointRadius: 3,
            fill: false,
            borderWidth: 4,
          },
        ],
      },
    });
  }
}
