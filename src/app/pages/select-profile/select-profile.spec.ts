import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProfile } from './select-profile';

describe('SelectProfile', () => {
  let component: SelectProfile;
  let fixture: ComponentFixture<SelectProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
