import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersComponent } from './components/customers/customers/customers.component';
import { SuppliersComponent } from './components/suppliers/suppliers/suppliers.component';
import { HealthCaresComponent } from "./components/healthCares/health-cares/health-cares.component";
import { LensesComponent } from './components/lenses/lenses/lenses.component';
import { FramesComponent } from './components/frames/frames/frames.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PrescriptionsComponent } from './components/prescriptions/prescriptions/prescriptions.component';
import { OrdersComponent } from './components/orders/orders/orders.component';

import { DataPrescriptionComponent } from './components/prescriptions/data-prescription/data-prescription.component';


const routes: Routes = [{
    path: '',   
    redirectTo: '/home', 
    pathMatch: 'full' 
},{
  path: 'new',
  component: DataPrescriptionComponent
},{
  path: 'pedidos',
  component: OrdersComponent
},
{
  path: 'recetas',
  component: PrescriptionsComponent
},{
  path: 'home',
  component: HomeComponent
},{
  path: 'login',
  component: LoginComponent
},{
  path: 'clientes',
  component: CustomersComponent
},{
  path: 'proveedores',
  component: SuppliersComponent
},{
  path: 'obrasSociales',
  component: HealthCaresComponent
},{
  path: 'lentes',
  component: LensesComponent
},{
  path: 'armazones',
  component: FramesComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
