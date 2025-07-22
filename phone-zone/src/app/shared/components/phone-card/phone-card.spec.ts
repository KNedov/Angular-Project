import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneCard } from './phone-card';

describe('PhoneCard', () => {
  let component: PhoneCard;
  let fixture: ComponentFixture<PhoneCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
