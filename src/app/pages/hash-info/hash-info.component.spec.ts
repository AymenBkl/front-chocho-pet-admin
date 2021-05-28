import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HashInfoComponent } from './hash-info.component';

describe('HashInfoComponent', () => {
  let component: HashInfoComponent;
  let fixture: ComponentFixture<HashInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HashInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HashInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
