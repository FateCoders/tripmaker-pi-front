import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileImg } from './profile-img';

describe('ProfileImg', () => {
  let component: ProfileImg;
  let fixture: ComponentFixture<ProfileImg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileImg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileImg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
