import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreneurCommerce } from './entrepreneur-commerce';

describe('EntrepreneurCommerce', () => {
  let component: EntrepreneurCommerce;
  let fixture: ComponentFixture<EntrepreneurCommerce>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrepreneurCommerce]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrepreneurCommerce);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
