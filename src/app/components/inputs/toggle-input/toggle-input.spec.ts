import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleInput } from './toggle-input';

describe('ToggleInput', () => {
  let component: ToggleInput;
  let fixture: ComponentFixture<ToggleInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
