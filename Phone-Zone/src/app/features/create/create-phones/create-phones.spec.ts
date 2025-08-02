import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePhones } from './create-phones';

describe('CreatePhones', () => {
  let component: CreatePhones;
  let fixture: ComponentFixture<CreatePhones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePhones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePhones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
