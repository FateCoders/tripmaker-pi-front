import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoterEventDetails } from './promoter-event-details';

describe('PromoterEventDetails', () => {
  let component: PromoterEventDetails;
  let fixture: ComponentFixture<PromoterEventDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoterEventDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoterEventDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
