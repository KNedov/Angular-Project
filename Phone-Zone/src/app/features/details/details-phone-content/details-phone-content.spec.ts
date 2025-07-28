import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPhoneContent } from './details-phone-content';

describe('DetailsPhoneContent', () => {
  let component: DetailsPhoneContent;
  let fixture: ComponentFixture<DetailsPhoneContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsPhoneContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsPhoneContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
