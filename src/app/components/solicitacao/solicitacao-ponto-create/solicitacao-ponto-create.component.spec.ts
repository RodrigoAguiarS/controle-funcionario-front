import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacaoPontoCreateComponent } from './solicitacao-ponto-create.component';

describe('SolicitacaoPontoCreateComponent', () => {
  let component: SolicitacaoPontoCreateComponent;
  let fixture: ComponentFixture<SolicitacaoPontoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitacaoPontoCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitacaoPontoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
