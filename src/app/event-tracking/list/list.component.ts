import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export enum SAFETY_EVENT_TRACK {
  OPENED = 'Page - Safety - Event - Details - Opened',
  VIDEO_STARTED = 'Safety - Event - Details - Video - Started',
  VIDEO_ENDED = 'Safety - Event - Details - Video - Completed',
  ROAD_VIDEO_DOWNLOADED = 'Safety - Event - Details - Video - Road Facing - Download',
  DUAL_VIDEOS_DOWNLOADED = 'Safety - Event - Details - Video - Dual - Download',
  DURATION_BETWEEN_GENERATION_AND_WATCH = 'Safety - Event - Details - Video - Duration Between Video Generation and Watch',
  VIDEO_WITH_NOTE_STARTED = 'Safety - Event - Details - Video - Video With Note Started',
  VIDEO_WITH_NOTE_ENDED = 'Safety - Event - Details - Video - Video With Note Ended',
  VIDEO_WITH_COACHING_STATUS_STARTED = 'Safety - Event - Details - Video - Video With Coaching Status Started',
  VIDEO_WITH_COACHING_STATUS_ENDED = 'Safety - Event - Details - Video - Video With Coaching Status Ended',
  ROAD_FACING_VIDEO_WITH_AI_STARTED = 'Safety - Event - Details - Video - Road Facing With AI Started',
  ROAD_FACING_VIDEO_WITH_AI_ENDED = 'Safety - Event - Details - Video - Road Facing With AI Ended',
  DRIVER_FACING_VIDEO_WITH_AI_STARTED = 'Safety - Event - Details - Video - Driver Facing With AI Started',
  DRIVER_FACING_VIDEO_WITH_AI_ENDED = 'Safety - Event - Details - Video - Driver Facing With AI Ended',
  EVENT_SEVERITY_FEEDBACK = 'Safety - Event - Details - Video - Event Severity User Feedback',
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public data = Object.values(SAFETY_EVENT_TRACK);
  constructor(private router: Router) {}

  ngOnInit(): void {}

  public onItemClick(event: string) {
    this.router.navigate(['/event/detail', { event }]);
  }
}
