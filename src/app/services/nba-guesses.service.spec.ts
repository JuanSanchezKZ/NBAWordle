import { TestBed } from '@angular/core/testing';

import { NbaGuessesService } from './nba-guesses.service';

describe('NbaGuesseService', () => {
  let service: NbaGuessesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NbaGuessesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
