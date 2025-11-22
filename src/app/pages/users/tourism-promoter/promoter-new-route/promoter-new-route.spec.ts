import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoterNewRoute } from './promoter-new-route';

describe('PromoterNewRoute', () => {
  let component: PromoterNewRoute;
  let fixture: ComponentFixture<PromoterNewRoute>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoterNewRoute]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoterNewRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
