import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PagesComponent } from './pages/pages.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { AuthGuard } from './guards/auth.guard';

  const routes : Routes = [
    {
       path : 'dashboard' ,
       component : PagesComponent,
       canActivate: [ AuthGuard ],
      //  canActivate: [],
       children : [
        { path : 'dashboard' , component : DashboardComponent } ,
        { path : 'medicos' , component : MedicoComponent } ,
        { path : 'pacientes' , component : PacienteComponent } ,
        { path : 'usuarios' , component : UsuarioComponent } ,
        // { path : '' , redirectTo : '/dashboard' , pathMatch: 'full' } ,
        // { path : '**' , component : DashboardComponent } ,
      ]
    },
    { path : 'login' , component : LoginComponent } ,
    { path : 'register' , component : RegisterComponent } ,
    { path : '' , redirectTo : '/login' , pathMatch: 'full' } ,
    { path : '**' , component : NopagefoundComponent } ,
   ] ;



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
