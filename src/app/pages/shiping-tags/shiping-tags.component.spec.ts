import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipingTagsComponent } from './shiping-tags.component';

describe('ShipingTagsComponent', () => {
  let component: ShipingTagsComponent;
  let fixture: ComponentFixture<ShipingTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipingTagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipingTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
