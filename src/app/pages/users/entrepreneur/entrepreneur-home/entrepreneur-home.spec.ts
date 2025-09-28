import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreneurHome } from './entrepreneur-home';

describe('EntrepreneurHome', () => {
  let component: EntrepreneurHome;
  let fixture: ComponentFixture<EntrepreneurHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrepreneurHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrepreneurHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
