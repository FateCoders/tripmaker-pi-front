import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterMenuButton } from './footer-menu-button';

describe('FooterMenuButton', () => {
  let component: FooterMenuButton;
  let fixture: ComponentFixture<FooterMenuButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterMenuButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterMenuButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
