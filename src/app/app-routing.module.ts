import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

import { PerfilCreateComponent } from './components/perfil/perfil-create/perfil-create.component';
import { PerfilListComponent } from './components/perfil/perfil-list/perfil-list.component';
import { PerfilUpdateComponent } from './components/perfil/perfil-update/perfil-update.component';
import { PerfilDeleteComponent } from './components/perfil/perfil-delete/perfil-delete.component';

import { CargoCreateComponent } from './components/cargo/cargo-create/cargo-create.component';
import { CargoListComponent } from './components/cargo/cargo-list/cargo-list.component';
import { CargoUpdateComponent } from './components/cargo/cargo-update/cargo-update.component';
import { CargoDeleteComponent } from './components/cargo/cargo-delete/cargo-delete.component';

import { FuncionarioCreateComponent } from './components/funcionario/funcionario-create/funcionario-create.component';
import { FuncionarioListComponent } from './components/funcionario/funcionario-list/funcionario-list.component';
import { FuncionarioUpdateComponent } from './components/funcionario/funcionario-update/funcionario-update.component';
import { FuncionarioDeleteComponent } from './components/funcionario/funcionario-delete/funcionario-delete.component';

import { TipoContratoCreateComponent } from './components/tipo-contrato/tipo-contrato-create/tipo-contrato-create.component';
import { TipoContratoListComponent } from './components/tipo-contrato/tipo-contrato-list/tipo-contrato-list.component';
import { TipoContratoUpdateComponent } from './components/tipo-contrato/tipo-contrato-update/tipo-contrato-update.component';
import { TipoContratoDeleteComponent } from './components/tipo-contrato/tipo-contrato-delete/tipo-contrato-delete.component';

import { PontoCreateComponent } from './components/ponto/ponto-create/ponto-create.component';
import { PontoUpdateComponent } from './components/ponto/ponto-update/ponto-update.component';
import { PontoDeleteComponent } from './components/ponto/ponto-delete/ponto-delete.component';

import { SolicitacaoPontoCreateComponent } from './components/solicitacao/solicitacao-ponto-create/solicitacao-ponto-create.component';
import { SolicitacaoListComponent } from './components/solicitacao/solicitacao-list/solicitacao-list.component';
import { SolicitacaoAprovarComponent } from './components/solicitacao/solicitacao-aprovar/solicitacao-aprovar.component';
import { SolicitacaoPontoAlteracaoComponent } from './components/solicitacao/solicitacao-ponto-alteracao/solicitacao-ponto-alteracao.component';


import { NoAuthGuard } from './auth/noauth.guard';
import { RoleGuard } from './auth/role.guard';
import { HomeComponent } from './components/home/home.component';
import { ACESSO } from './model/Acesso';
import { NavComponent } from './components/nav/nav.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  {
    path: '',
    component: NavComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [RoleGuard],
        data: { roles: [ACESSO.ADMINISTRADOR, ACESSO.USUARIO] },
      },
      {
        path: 'funcionarios',
        canActivate: [RoleGuard],
        data: { roles: [ACESSO.ADMINISTRADOR] },
        children: [
          { path: '', component: FuncionarioListComponent },
          { path: 'create', component: FuncionarioCreateComponent },
          { path: 'update/:id', component: FuncionarioUpdateComponent },
          { path: 'delete/:id', component: FuncionarioDeleteComponent },
        ],
      },
      {
        path: 'perfis',
        canActivate: [RoleGuard],
        data: { roles: [ACESSO.ADMINISTRADOR] },
        children: [
          { path: '', component: PerfilListComponent },
          { path: 'create', component: PerfilCreateComponent },
          { path: 'update/:id', component: PerfilUpdateComponent },
          { path: 'delete/:id', component: PerfilDeleteComponent },
        ],
      },
      {
        path: 'pontos',
        canActivate: [RoleGuard],
        data: { roles: [ACESSO.ADMINISTRADOR, ACESSO.USUARIO] },
        children: [
          { path: 'create', component: PontoCreateComponent },
          { path: 'update/:id', component: PontoUpdateComponent },
          { path: 'delete/:id', component: PontoDeleteComponent },
        ],
      },
      {
        path: 'cargos',
        canActivate: [RoleGuard],
        data: { roles: [ACESSO.ADMINISTRADOR] },
        children: [
          { path: '', component: CargoListComponent },
          { path: 'create', component: CargoCreateComponent },
          { path: 'update/:id', component: CargoUpdateComponent },
          { path: 'delete/:id', component: CargoDeleteComponent },
        ],
      },
      {
        path: 'tipo-contratos',
        canActivate: [RoleGuard],
        data: { roles: [ACESSO.ADMINISTRADOR] },
        children: [
          { path: '', component: TipoContratoListComponent },
          { path: 'create', component: TipoContratoCreateComponent },
          { path: 'update/:id', component: TipoContratoUpdateComponent },
          { path: 'delete/:id', component: TipoContratoDeleteComponent },
        ],
      },

      {
        path: 'solicitacoes',
        canActivate: [RoleGuard],
        data: { roles: [ACESSO.ADMINISTRADOR, ACESSO.USUARIO] },
        children: [
          { path: '', component: SolicitacaoListComponent },
          { path: 'create', component: SolicitacaoPontoCreateComponent },
          { path: 'aprovar/:id', component: SolicitacaoAprovarComponent },
          { path: 'alteracao/:id', component: SolicitacaoPontoAlteracaoComponent },
        ],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
