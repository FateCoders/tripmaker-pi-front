import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorUserForm } from './user-form';

describe('UserForm', () => {
  let component: AdministratorUserForm;
  let fixture: ComponentFixture<AdministratorUserForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministratorUserForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministratorUserForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
