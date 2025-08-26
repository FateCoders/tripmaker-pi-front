import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipButton } from './chip-button';

describe('ChipButton', () => {
  let component: ChipButton;
  let fixture: ComponentFixture<ChipButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChipButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
