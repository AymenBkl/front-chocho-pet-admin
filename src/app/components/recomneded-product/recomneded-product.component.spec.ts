import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomnededProductComponent } from './recomneded-product.component';

describe('RecomnededProductComponent', () => {
  let component: RecomnededProductComponent;
  let fixture: ComponentFixture<RecomnededProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecomnededProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomnededProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
