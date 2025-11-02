import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteSummaryItem } from './route-summary-item';

describe('RouteSummaryItem', () => {
  let component: RouteSummaryItem;
  let fixture: ComponentFixture<RouteSummaryItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteSummaryItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteSummaryItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
