import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPhoneCard } from './product-phone-card';

describe('ProductPhoneCard', () => {
  let component: ProductPhoneCard;
  let fixture: ComponentFixture<ProductPhoneCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductPhoneCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPhoneCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
