import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductdescriptionviewerComponent } from './productdescriptionviewer.component';

describe('ProductdescriptionviewerComponent', () => {
  let component: ProductdescriptionviewerComponent;
  let fixture: ComponentFixture<ProductdescriptionviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductdescriptionviewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductdescriptionviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
