import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoPhoneMessage } from './no-phone-message';

describe('NoPhoneMessage', () => {
  let component: NoPhoneMessage;
  let fixture: ComponentFixture<NoPhoneMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoPhoneMessage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoPhoneMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
