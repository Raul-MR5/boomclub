import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChochelistaComponent } from './chochelista.component';

describe('ChochelistaComponent', () => {
  let component: ChochelistaComponent;
  let fixture: ComponentFixture<ChochelistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChochelistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChochelistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
