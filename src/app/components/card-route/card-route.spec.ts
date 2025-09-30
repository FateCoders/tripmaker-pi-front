import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRoute } from './card-route';

describe('CardRoute', () => {
  let component: CardRoute;
  let fixture: ComponentFixture<CardRoute>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardRoute]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
