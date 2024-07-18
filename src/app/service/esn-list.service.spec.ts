import { TestBed } from '@angular/core/testing';

import { EsnListService } from './esn-list.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EsnListService', () => {
  let service: EsnListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(EsnListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
