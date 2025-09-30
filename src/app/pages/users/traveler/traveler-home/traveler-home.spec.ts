import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelerHome } from './traveler-home';

describe('TravelerHome', () => {
  let component: TravelerHome;
  let fixture: ComponentFixture<TravelerHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelerHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelerHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
