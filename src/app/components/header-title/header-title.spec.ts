import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTitle } from './header-title';

describe('HeaderTitle', () => {
  let component: HeaderTitle;
  let fixture: ComponentFixture<HeaderTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderTitle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderTitle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
