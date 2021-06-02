import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestTipsComponent } from './best-tips.component';

describe('BestTipsComponent', () => {
  let component: BestTipsComponent;
  let fixture: ComponentFixture<BestTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestTipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BestTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
