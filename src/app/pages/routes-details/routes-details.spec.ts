import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesDetailsComponents } from './routes-details';

describe('RoutesDetailsComponents', () => {
  let component: RoutesDetailsComponents;
  let fixture: ComponentFixture<RoutesDetailsComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutesDetailsComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutesDetailsComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
