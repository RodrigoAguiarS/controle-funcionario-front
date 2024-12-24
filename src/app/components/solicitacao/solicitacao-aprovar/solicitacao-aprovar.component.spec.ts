import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacaoAprovarComponent } from './solicitacao-aprovar.component';

describe('SolicitacaoAprovarComponent', () => {
  let component: SolicitacaoAprovarComponent;
  let fixture: ComponentFixture<SolicitacaoAprovarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitacaoAprovarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitacaoAprovarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
