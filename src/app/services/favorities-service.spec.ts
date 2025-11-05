import { TestBed } from '@angular/core/testing';

import { FavoritiesService } from './favorities-service';

describe('FavoritiesService', () => {
  let service: FavoritiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
