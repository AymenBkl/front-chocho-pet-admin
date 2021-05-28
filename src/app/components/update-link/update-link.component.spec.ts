import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLinkComponent } from './update-link.component';

describe('UpdateLinkComponent', () => {
  let component: UpdateLinkComponent;
  let fixture: ComponentFixture<UpdateLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
