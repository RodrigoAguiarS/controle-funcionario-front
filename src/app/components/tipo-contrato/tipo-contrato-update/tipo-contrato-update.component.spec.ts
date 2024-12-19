import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoContratoUpdateComponent } from './tipo-contrato-update.component';

describe('TipoContratoUpdateComponent', () => {
  let component: TipoContratoUpdateComponent;
  let fixture: ComponentFixture<TipoContratoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoContratoUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoContratoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
