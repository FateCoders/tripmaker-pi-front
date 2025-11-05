import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCommerce } from './new-commerce';

describe('NewCommerce', () => {
  let component: NewCommerce;
  let fixture: ComponentFixture<NewCommerce>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCommerce]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCommerce);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
