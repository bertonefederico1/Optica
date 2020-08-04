import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from "./material.module";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './components/clients/clients/clients.component';
import { AddClientComponent } from './components/clients/add-client/add-client.component';
import { ClientDataComponent } from './components/clients/client-data/client-data.component';
import { SuppliersComponent } from './components/suppliers/suppliers/suppliers.component';
import { AddSupplierComponent } from './components/suppliers/add-supplier/add-supplier.component';
import { SupplierDataComponent } from './components/suppliers/supplier-data/supplier-data.component';
import { ObrasSocialesComponent } from './components/obrasSociales/obras-sociales/obras-sociales.component';
import { AddObraSocialComponent } from './components/obrasSociales/add-obra-social/add-obra-social.component';
import { LensesComponent } from './components/lenses/lenses/lenses.component';
import { AddLensComponent } from './components/lenses/add-lens/add-lens.component';
import { LensDataComponent } from './components/lenses/lens-data/lens-data.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    AddClientComponent,
    ClientDataComponent,
    SuppliersComponent,
    AddSupplierComponent,
    SupplierDataComponent,
    ObrasSocialesComponent,
    AddObraSocialComponent,
    LensesComponent,
    AddLensComponent,
    LensDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
