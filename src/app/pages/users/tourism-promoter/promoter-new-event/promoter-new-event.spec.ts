import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoterNewEvent } from './promoter-new-event';

describe('PromoterNewEvent', () => {
  let component: PromoterNewEvent;
  let fixture: ComponentFixture<PromoterNewEvent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoterNewEvent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoterNewEvent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
