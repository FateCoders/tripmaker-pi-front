import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteSave } from './route-save';

describe('RouteSave', () => {
  let component: RouteSave;
  let fixture: ComponentFixture<RouteSave>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteSave]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteSave);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
