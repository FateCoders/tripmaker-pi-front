import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorUserDetail } from './administrator-user-detail';

describe('AdministratorUserDetail', () => {
  let component: AdministratorUserDetail;
  let fixture: ComponentFixture<AdministratorUserDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministratorUserDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministratorUserDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
