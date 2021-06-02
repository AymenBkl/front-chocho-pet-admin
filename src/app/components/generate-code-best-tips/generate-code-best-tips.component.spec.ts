import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateCodeBestTipsComponent } from './generate-code-best-tips.component';

describe('GenerateCodeBestTipsComponent', () => {
  let component: GenerateCodeBestTipsComponent;
  let fixture: ComponentFixture<GenerateCodeBestTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateCodeBestTipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateCodeBestTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
