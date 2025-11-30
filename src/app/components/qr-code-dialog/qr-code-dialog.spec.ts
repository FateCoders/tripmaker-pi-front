import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeDialog } from './qr-code-dialog';

describe('QrCodeDialog', () => {
  let component: QrCodeDialog;
  let fixture: ComponentFixture<QrCodeDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrCodeDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrCodeDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
