import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductNavigation } from './product-navigation';

describe('ProductNavigation', () => {
  let component: ProductNavigation;
  let fixture: ComponentFixture<ProductNavigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductNavigation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductNavigation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
