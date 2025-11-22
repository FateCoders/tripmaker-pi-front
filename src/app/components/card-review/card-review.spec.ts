import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardReview } from './card-review';

describe('CardReview', () => {
  let component: CardReview;
  let fixture: ComponentFixture<CardReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardReview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardReview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
