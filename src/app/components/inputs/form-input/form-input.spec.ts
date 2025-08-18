import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInput } from './form-input';

describe('FormInput', () => {
  let component: FormInput;
  let fixture: ComponentFixture<FormInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
