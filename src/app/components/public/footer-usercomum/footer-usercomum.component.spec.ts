import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterUsercomumComponent } from './footer-usercomum.component';

describe('FooterUsercomumComponent', () => {
  let component: FooterUsercomumComponent;
  let fixture: ComponentFixture<FooterUsercomumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterUsercomumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterUsercomumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
