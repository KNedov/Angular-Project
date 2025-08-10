import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPhonesBoard } from './my-phones-board';

describe('MyPhonesBoard', () => {
  let component: MyPhonesBoard;
  let fixture: ComponentFixture<MyPhonesBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPhonesBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPhonesBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
