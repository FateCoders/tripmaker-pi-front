import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesChat } from './routes-chat';

describe('RoutesChat', () => {
  let component: RoutesChat;
  let fixture: ComponentFixture<RoutesChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutesChat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutesChat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
