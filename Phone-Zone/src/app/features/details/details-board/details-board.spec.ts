import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBoard } from './details-board';

describe('DetailsBoard', () => {
  let component: DetailsBoard;
  let fixture: ComponentFixture<DetailsBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
