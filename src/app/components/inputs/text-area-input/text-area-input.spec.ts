import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAreaInput } from './text-area-input';

describe('TextAreaInput', () => {
  let component: TextAreaInput;
  let fixture: ComponentFixture<TextAreaInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextAreaInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextAreaInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
