import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesDetais } from './routes-detais';

describe('RoutesDetais', () => {
  let component: RoutesDetais;
  let fixture: ComponentFixture<RoutesDetais>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutesDetais]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutesDetais);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
