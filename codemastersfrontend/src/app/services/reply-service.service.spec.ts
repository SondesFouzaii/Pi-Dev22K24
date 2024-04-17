import { TestBed } from '@angular/core/testing';

import { ReplyServiceService } from './reply-service.service';

describe('ReplyServiceService', () => {
  let service: ReplyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReplyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
