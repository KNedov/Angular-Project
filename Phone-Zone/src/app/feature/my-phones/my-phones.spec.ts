import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPhones } from './my-phones';

describe('MyPhones', () => {
  let component: MyPhones;
  let fixture: ComponentFixture<MyPhones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPhones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPhones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
