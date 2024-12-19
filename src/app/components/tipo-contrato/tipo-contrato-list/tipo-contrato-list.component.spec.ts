import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoContratoListComponent } from './tipo-contrato-list.component';

describe('TipoContratoListComponent', () => {
  let component: TipoContratoListComponent;
  let fixture: ComponentFixture<TipoContratoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoContratoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoContratoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
