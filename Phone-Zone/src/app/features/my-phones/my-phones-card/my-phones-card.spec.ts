import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPhonesCard } from './my-phones-card';

describe('MyPhonesCard', () => {
  let component: MyPhonesCard;
  let fixture: ComponentFixture<MyPhonesCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPhonesCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPhonesCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
