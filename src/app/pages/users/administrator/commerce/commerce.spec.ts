import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorCommerce } from './commerce';

describe('Commerce', () => {
  let component: AdministratorCommerce;
  let fixture: ComponentFixture<AdministratorCommerce>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministratorCommerce]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministratorCommerce);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
