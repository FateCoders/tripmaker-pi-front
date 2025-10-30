import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCarousel } from './card-carousel';

describe('CardCarousel', () => {
  let component: CardCarousel;
  let fixture: ComponentFixture<CardCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
