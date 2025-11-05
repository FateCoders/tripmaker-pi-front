import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUser } from './card-user';

describe('CardUser', () => {
  let component: CardUser;
  let fixture: ComponentFixture<CardUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
