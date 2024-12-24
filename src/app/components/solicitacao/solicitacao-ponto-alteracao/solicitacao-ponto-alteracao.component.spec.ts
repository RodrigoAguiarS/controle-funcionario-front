import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacaoPontoAlteracaoComponent } from './solicitacao-ponto-alteracao.component';

describe('SolicitacaoPontoAlteracaoComponent', () => {
  let component: SolicitacaoPontoAlteracaoComponent;
  let fixture: ComponentFixture<SolicitacaoPontoAlteracaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitacaoPontoAlteracaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitacaoPontoAlteracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
