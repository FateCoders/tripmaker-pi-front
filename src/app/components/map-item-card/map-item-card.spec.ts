import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapItemCard } from './map-item-card';

describe('MapItemCard', () => {
  let component: MapItemCard;
  let fixture: ComponentFixture<MapItemCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapItemCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapItemCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
