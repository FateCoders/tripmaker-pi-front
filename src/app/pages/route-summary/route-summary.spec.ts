import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteSummary } from './route-summary';

describe('RouteSummary', () => {
  let component: RouteSummary;
  let fixture: ComponentFixture<RouteSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
