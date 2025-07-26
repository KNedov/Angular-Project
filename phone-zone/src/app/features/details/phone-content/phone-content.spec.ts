import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneContent } from './phone-content';

describe('PhoneContent', () => {
  let component: PhoneContent;
  let fixture: ComponentFixture<PhoneContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
