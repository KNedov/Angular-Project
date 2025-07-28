import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCommentsSection } from './details-comments-section';

describe('DetailsCommentsSection', () => {
  let component: DetailsCommentsSection;
  let fixture: ComponentFixture<DetailsCommentsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsCommentsSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsCommentsSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
