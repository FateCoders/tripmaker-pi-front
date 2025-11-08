import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorCommerceDetail } from './administrator-commerce-detail';

describe('AdministratorCommerceDetail', () => {
  let component: AdministratorCommerceDetail;
  let fixture: ComponentFixture<AdministratorCommerceDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministratorCommerceDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministratorCommerceDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
