import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreneurNewCommerce } from './entrepreneur-new-commerce';

describe('EntrepreneurNewCommerce', () => {
  let component: EntrepreneurNewCommerce;
  let fixture: ComponentFixture<EntrepreneurNewCommerce>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrepreneurNewCommerce]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrepreneurNewCommerce);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
