import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDetails } from './button-details';

describe('ButtonDetails', () => {
  let component: ButtonDetails;
  let fixture: ComponentFixture<ButtonDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
