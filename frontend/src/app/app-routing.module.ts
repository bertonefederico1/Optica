import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsComponent } from './components/clients/clients/clients.component';
import { SuppliersComponent } from './components/suppliers/suppliers/suppliers.component';
import { ObrasSocialesComponent } from "./components/obrasSociales/obras-sociales/obras-sociales.component";


const routes: Routes = [{
  path: 'clientes',
  component: ClientsComponent
},{
  path: 'proveedores',
  component: SuppliersComponent
},{
  path: 'obrasSociales',
  component: ObrasSocialesComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
