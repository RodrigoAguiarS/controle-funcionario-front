import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoContratoCreateComponent } from './tipo-contrato-create.component';

describe('TipoContratoCreateComponent', () => {
  let component: TipoContratoCreateComponent;
  let fixture: ComponentFixture<TipoContratoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoContratoCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoContratoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
