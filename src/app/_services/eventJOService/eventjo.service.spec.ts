import { TestBed } from '@angular/core/testing';

import { EventjoService } from './eventjo.service';

describe('EventjoService', () => {
  let service: EventjoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventjoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
