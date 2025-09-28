import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourismPromoterHome } from './tourism-promoter-home';

describe('TourismPromoterHome', () => {
  let component: TourismPromoterHome;
  let fixture: ComponentFixture<TourismPromoterHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourismPromoterHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourismPromoterHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
