import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsComponent } from './components/clients/clients/clients.component';
import { AddClientComponent } from './components/clients/add-client/add-client.component';
import { SuppliersComponent } from './components/suppliers/suppliers/suppliers.component';


const routes: Routes = [{
  path: 'clientes',
  component: ClientsComponent
},{
  path: 'proveedores',
  component: SuppliersComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
