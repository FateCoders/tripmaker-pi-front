import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsList } from './tabs-list';

describe('TabsList', () => {
  let component: TabsList;
  let fixture: ComponentFixture<TabsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
