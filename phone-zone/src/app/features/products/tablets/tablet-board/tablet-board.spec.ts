import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabletBoard } from './tablet-board';

describe('TabletBoard', () => {
  let component: TabletBoard;
  let fixture: ComponentFixture<TabletBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabletBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabletBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
