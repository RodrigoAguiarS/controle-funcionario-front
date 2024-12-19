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

import { TipoContratoCreateComponent } from './components/tipo-contrato/tipo-contrato-create/tipo-contrato-create.component';
import { TipoContratoListComponent } from './components/tipo-contrato/tipo-contrato-list/tipo-contrato-list.component';


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
