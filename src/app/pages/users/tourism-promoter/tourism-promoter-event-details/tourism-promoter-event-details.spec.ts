import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourismPromoterEventDetails } from './tourism-promoter-event-details';

describe('TourismPromoterEventDetails', () => {
  let component: TourismPromoterEventDetails;
  let fixture: ComponentFixture<TourismPromoterEventDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourismPromoterEventDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourismPromoterEventDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
