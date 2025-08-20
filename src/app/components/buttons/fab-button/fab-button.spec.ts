import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabButton } from './fab-button';

describe('FabButton', () => {
  let component: FabButton;
  let fixture: ComponentFixture<FabButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FabButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FabButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
