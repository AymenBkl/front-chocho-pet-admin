import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratingBestReviewsComponent } from './generating-best-reviews.component';

describe('GeneratingBestReviewsComponent', () => {
  let component: GeneratingBestReviewsComponent;
  let fixture: ComponentFixture<GeneratingBestReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratingBestReviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratingBestReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
