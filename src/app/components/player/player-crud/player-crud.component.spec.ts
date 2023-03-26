import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCrudComponent } from './player-crud.component';

describe('PlayerCrudComponent', () => {
  let component: PlayerCrudComponent;
  let fixture: ComponentFixture<PlayerCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
