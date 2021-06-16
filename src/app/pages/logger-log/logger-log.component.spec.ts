import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggerLogComponent } from './logger-log.component';

describe('LoggerLogComponent', () => {
  let component: LoggerLogComponent;
  let fixture: ComponentFixture<LoggerLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggerLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggerLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
