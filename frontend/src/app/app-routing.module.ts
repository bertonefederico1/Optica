import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersComponent } from './components/customers/customers/customers.component';
import { SuppliersComponent } from './components/suppliers/suppliers/suppliers.component';
import { HealthCaresComponent } from "./components/healthCares/health-cares/health-cares.component";
import { LensesComponent } from './components/lenses/lenses/lenses.component';
import { FramesComponent } from './components/frames/frames/frames.component';
import { LoginComponent } from './components/login/login.component';
import { PrescriptionsComponent } from './components/prescriptions/prescriptions/prescriptions.component';
import { OrdersComponent } from './components/orders/orders/orders.component';
import { GlassesComponent } from './components/glasses/glasses/glasses.component';
import { ReportHealthCareComponent } from "./components/healthCares/report-health-care/report-health-care.component";
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [{
  path: '',  
  redirectTo: '/inicio', 
  pathMatch: 'full' 
},{
  path: 'reportHealthCare',
  component: ReportHealthCareComponent,
  canActivate: [AuthGuard]
},{
  path: 'inicio',
  component: HomeComponent,
  canActivate: [AuthGuard]
},{
  path: 'anteojos',
  component: GlassesComponent,
  canActivate: [AuthGuard]
},{
  path: 'pedidos',
  component: OrdersComponent,
  canActivate: [AuthGuard]
},{
  path: 'recetas',
  component: PrescriptionsComponent,
  canActivate: [AuthGuard]
},{
  path: 'login',
  component: LoginComponent
},{
  path: 'clientes',
  component: CustomersComponent,
  canActivate: [AuthGuard]
},{
  path: 'proveedores',
  component: SuppliersComponent,
  canActivate: [AuthGuard]
},{
  path: 'obrasSociales',
  component: HealthCaresComponent,
  canActivate: [AuthGuard]
},{
  path: 'lentes',
  component: LensesComponent,
  canActivate: [AuthGuard]
},{
  path: 'armazones',
  component: FramesComponent,
  canActivate: [AuthGuard]
},{
  path: '**',
  redirectTo: '/inicio',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
