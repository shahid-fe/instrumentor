import { TestBed } from '@angular/core/testing';

import { EventTrackingDetailService } from './event-tracking-detail.service';

describe('EventTrackingDetailService', () => {
  let service: EventTrackingDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventTrackingDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
