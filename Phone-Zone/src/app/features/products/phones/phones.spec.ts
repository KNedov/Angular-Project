import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Phones } from './phones';

describe('Phones', () => {
  let component: Phones;
  let fixture: ComponentFixture<Phones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Phones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Phones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
