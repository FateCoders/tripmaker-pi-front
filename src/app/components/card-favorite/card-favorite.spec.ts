import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFavorite } from './card-favorite';

describe('CardFavorite', () => {
  let component: CardFavorite;
  let fixture: ComponentFixture<CardFavorite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFavorite]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardFavorite);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
