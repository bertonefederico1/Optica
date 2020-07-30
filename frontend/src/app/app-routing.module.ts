import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsComponent } from './components/clients/clients/clients.component';
import { AddClientComponent } from './components/clients/add-client/add-client.component';


const routes: Routes = [{
  path: 'clients',
  component: ClientsComponent
},{
  path: 'clients/addClient',
  component: AddClientComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
