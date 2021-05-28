import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositStatComponent } from './deposit-stat.component';

describe('DepositStatComponent', () => {
  let component: DepositStatComponent;
  let fixture: ComponentFixture<DepositStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
