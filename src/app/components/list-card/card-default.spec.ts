import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDefault } from './card-default';

describe('CardDefault', () => {
  let component: CardDefault;
  let fixture: ComponentFixture<CardDefault>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDefault]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDefault);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
