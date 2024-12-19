import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoUpdateComponent } from './cargo-update.component';

describe('CargoUpdateComponent', () => {
  let component: CargoUpdateComponent;
  let fixture: ComponentFixture<CargoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargoUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
