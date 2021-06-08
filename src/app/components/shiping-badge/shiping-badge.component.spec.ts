import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipingBadgeComponent } from './shiping-badge.component';

describe('ShipingBadgeComponent', () => {
  let component: ShipingBadgeComponent;
  let fixture: ComponentFixture<ShipingBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipingBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipingBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
