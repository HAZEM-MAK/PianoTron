import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandComponent } from './rand.component';

describe('RandComponent', () => {
  let component: RandComponent;
  let fixture: ComponentFixture<RandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
