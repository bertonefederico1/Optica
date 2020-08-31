import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersComponent } from './components/customers/customers/customers.component';
import { SuppliersComponent } from './components/suppliers/suppliers/suppliers.component';
import { HealthCaresComponent } from "./components/healthCares/health-cares/health-cares.component";
import { LensesComponent } from './components/lenses/lenses/lenses.component';
import { FramesComponent } from './components/frames/frames/frames.component';


const routes: Routes = [{
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
