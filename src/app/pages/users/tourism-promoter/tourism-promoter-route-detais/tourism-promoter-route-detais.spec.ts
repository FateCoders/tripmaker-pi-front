import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourismPromoterRouteDetais } from './tourism-promoter-route-detais';

describe('TourismPromoterRouteDetais', () => {
  let component: TourismPromoterRouteDetais;
  let fixture: ComponentFixture<TourismPromoterRouteDetais>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourismPromoterRouteDetais]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourismPromoterRouteDetais);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
