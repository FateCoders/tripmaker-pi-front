import { TestBed } from '@angular/core/testing';

import { CanDeactivateFn } from '@angular/router';

import { CanComponentDeactivate } from './can-deactivate-guard-guard'; // Import the correct interface

import { canDeactivateGuard } from './can-deactivate-guard-guard';

describe('canDeactivateGuard', () => {
  const executeGuard: CanDeactivateFn<CanComponentDeactivate> = (...guardParameters) =>
    TestBed.runInInjectionContext(() => canDeactivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
