import { MedicoFormComponent } from './medico/medico-form/medico-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './services/auth/auth-guard.service';

import { MedicoListComponent } from './medico/medico-list/medico-list.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'medicos', component: MedicoListComponent, canActivate: [AuthGuardService] },
  { path: 'medicos/novo', component: MedicoFormComponent, canActivate: [AuthGuardService] },
  { path: 'medicos/:id', component: MedicoFormComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
