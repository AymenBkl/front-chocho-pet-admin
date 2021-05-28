import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardStateComponent } from './card-state.component';

describe('CardStateComponent', () => {
  let component: CardStateComponent;
  let fixture: ComponentFixture<CardStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
