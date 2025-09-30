import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEvent } from './card-event';

describe('CardEvent', () => {
  let component: CardEvent;
  let fixture: ComponentFixture<CardEvent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardEvent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardEvent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
