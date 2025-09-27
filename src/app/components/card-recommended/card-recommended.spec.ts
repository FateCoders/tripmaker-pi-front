import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRecommended } from './card-recommended';

describe('CardRecommended', () => {
  let component: CardRecommended;
  let fixture: ComponentFixture<CardRecommended>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardRecommended]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardRecommended);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
