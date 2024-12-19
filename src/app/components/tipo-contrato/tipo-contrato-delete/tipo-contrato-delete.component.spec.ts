import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoContratoDeleteComponent } from './tipo-contrato-delete.component';

describe('TipoContratoDeleteComponent', () => {
  let component: TipoContratoDeleteComponent;
  let fixture: ComponentFixture<TipoContratoDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoContratoDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoContratoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
