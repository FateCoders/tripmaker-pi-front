import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileListItem } from './tile-list-item';

describe('TileListItem', () => {
  let component: TileListItem;
  let fixture: ComponentFixture<TileListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TileListItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TileListItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
