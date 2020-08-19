import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsComponent } from './components/clients/clients/clients.component';
import { SuppliersComponent } from './components/suppliers/suppliers/suppliers.component';
import { ObrasSocialesComponent } from "./components/obrasSociales/obras-sociales/obras-sociales.component";
import { LensesComponent } from './components/lenses/lenses/lenses.component';
import { FramesComponent } from './components/frames/frames/frames.component';
import { AddClientComponent } from './components/clients/add-client/add-client.component';


const routes: Routes = [{
  path: 'clientes',
  component: ClientsComponent
},{
  path: 'proveedores',
  component: SuppliersComponent
},{
  path: 'obrasSociales',
  component: ObrasSocialesComponent
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
