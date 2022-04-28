import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'', component:DashboardComponent, pathMatch: "full", canActivate: [AuthGuard]},
  {path:'register', component:RegisterComponent},
  {path: 'create', component: CreateComponent, pathMatch: "full", canActivate: [AuthGuard]},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
