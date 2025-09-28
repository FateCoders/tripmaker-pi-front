import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorHome } from './administrator-home.component';

describe('HomeComponent', () => {
  let component: AdministratorHome;
  let fixture: ComponentFixture<AdministratorHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministratorHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministratorHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
