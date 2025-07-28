import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsBoard } from './products-board';

describe('ProductsBoard', () => {
  let component: ProductsBoard;
  let fixture: ComponentFixture<ProductsBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
