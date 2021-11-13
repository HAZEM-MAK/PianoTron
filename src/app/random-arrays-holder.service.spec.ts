import { TestBed } from '@angular/core/testing';

import { RandomArraysHolderService } from './random-arrays-holder.service';

describe('RandomArraysHolderService', () => {
  let service: RandomArraysHolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomArraysHolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
