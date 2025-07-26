import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneBoard } from './phone-board';

describe('PhoneBoard', () => {
  let component: PhoneBoard;
  let fixture: ComponentFixture<PhoneBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
