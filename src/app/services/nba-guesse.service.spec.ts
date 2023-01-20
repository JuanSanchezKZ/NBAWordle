import { TestBed } from '@angular/core/testing';

import { NbaGuesseService } from './nba-guesse.service';

describe('NbaGuesseService', () => {
  let service: NbaGuesseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NbaGuesseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
