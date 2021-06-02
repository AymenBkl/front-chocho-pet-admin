import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestReviewsComponent } from './best-reviews.component';

describe('BestReviewsComponent', () => {
  let component: BestReviewsComponent;
  let fixture: ComponentFixture<BestReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestReviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BestReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
