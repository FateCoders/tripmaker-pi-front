import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteCard } from './route-card';

describe('RouteCard', () => {
  let component: RouteCard;
  let fixture: ComponentFixture<RouteCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
