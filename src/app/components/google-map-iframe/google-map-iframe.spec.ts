import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapIframe } from './google-map-iframe';

describe('GoogleMapIframe', () => {
  let component: GoogleMapIframe;
  let fixture: ComponentFixture<GoogleMapIframe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleMapIframe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleMapIframe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
