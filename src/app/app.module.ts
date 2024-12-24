import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { CurrencyMaskModule } from "ng2-currency-mask";
import { CepPipe, CnpjPipe, CPFPipe, TelefonePipe, DurationPipe, DateTimeFormatPipe } from '../pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N, pt_BR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NgxMaskModule } from 'ngx-mask';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { HeaderComponent } from './components/header/header.component';
import { PerfilCreateComponent } from './components/perfil/perfil-create/perfil-create.component';
import { CargoCreateComponent } from './components/cargo/cargo-create/cargo-create.component';
import { FuncionarioCreateComponent } from './components/funcionario/funcionario-create/funcionario-create.component';
import { PerfilListComponent } from './components/perfil/perfil-list/perfil-list.component';
import { PerfilUpdateComponent } from './components/perfil/perfil-update/perfil-update.component';
import { PerfilDeleteComponent } from './components/perfil/perfil-delete/perfil-delete.component';
import { CargoListComponent } from './components/cargo/cargo-list/cargo-list.component';
import { CargoUpdateComponent } from './components/cargo/cargo-update/cargo-update.component';
import { CargoDeleteComponent } from './components/cargo/cargo-delete/cargo-delete.component';
import { FuncionarioListComponent } from './components/funcionario/funcionario-list/funcionario-list.component';
import { TipoContratoCreateComponent } from './components/tipo-contrato/tipo-contrato-create/tipo-contrato-create.component';
import { TipoContratoListComponent } from './components/tipo-contrato/tipo-contrato-list/tipo-contrato-list.component';
import { TipoContratoUpdateComponent } from './components/tipo-contrato/tipo-contrato-update/tipo-contrato-update.component';
import { TipoContratoDeleteComponent } from './components/tipo-contrato/tipo-contrato-delete/tipo-contrato-delete.component';
import { FuncionarioUpdateComponent } from './components/funcionario/funcionario-update/funcionario-update.component';
import { FuncionarioDeleteComponent } from './components/funcionario/funcionario-delete/funcionario-delete.component';
import { PontoCreateComponent } from './components/ponto/ponto-create/ponto-create.component';
import { PontoUpdateComponent } from './components/ponto/ponto-update/ponto-update.component';
import { PontoDeleteComponent } from './components/ponto/ponto-delete/ponto-delete.component';
import { SolicitacaoPontoCreateComponent } from './components/solicitacao/solicitacao-ponto-create/solicitacao-ponto-create.component';
import { SolicitacaoListComponent } from './components/solicitacao/solicitacao-list/solicitacao-list.component';
import { SolicitacaoAprovarComponent } from './components/solicitacao/solicitacao-aprovar/solicitacao-aprovar.component';
import { SolicitacaoPontoAlteracaoComponent } from './components/solicitacao/solicitacao-ponto-alteracao/solicitacao-ponto-alteracao.component';


registerLocaleData(pt);

@NgModule({
  declarations: [
    TelefonePipe,
    CPFPipe,
    CepPipe,
    CnpjPipe,
    DateTimeFormatPipe,
    DurationPipe,
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    HeaderComponent,
    PerfilCreateComponent,
    CargoCreateComponent,
    FuncionarioCreateComponent,
    PerfilListComponent,
    PerfilUpdateComponent,
    PerfilDeleteComponent,
    CargoListComponent,
    CargoUpdateComponent,
    CargoDeleteComponent,
    FuncionarioListComponent,
    TipoContratoCreateComponent,
    TipoContratoListComponent,
    TipoContratoUpdateComponent,
    TipoContratoDeleteComponent,
    FuncionarioUpdateComponent,
    FuncionarioDeleteComponent,
    PontoCreateComponent,
    PontoUpdateComponent,
    PontoDeleteComponent,
    SolicitacaoPontoCreateComponent,
    SolicitacaoListComponent,
    SolicitacaoAprovarComponent,
    SolicitacaoPontoAlteracaoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CurrencyMaskModule,
    NzMessageModule,
    NzInputModule,
    NzButtonModule,
    NzSwitchModule,
    NzImageModule,
    NzEmptyModule,
    NzSpinModule,
    NzStatisticModule,
    NzCollapseModule,
    NzResultModule,
    NzAutocompleteModule,
    NzPaginationModule,
    NzDatePickerModule,
    NzTabsModule,
    NzCardModule,
    NzMenuModule,
    NzCheckboxModule,
    NzAvatarModule,
    NzSelectModule,
    NzListModule,
    NzTableModule,
    NzBadgeModule,
    NzLayoutModule,
    NzPageHeaderModule,
    NzIconModule,
    FormsModule,
    NzModalModule,
    NzPopconfirmModule,
    NzSpaceModule,
    NzDropDownModule,
    NzUploadModule,
    NzFormModule,
    NzDescriptionsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: NZ_I18N, useValue: pt_BR },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
