import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameHashHistoryComponent } from './game-hash-history.component';

describe('GameHashHistoryComponent', () => {
  let component: GameHashHistoryComponent;
  let fixture: ComponentFixture<GameHashHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameHashHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameHashHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
