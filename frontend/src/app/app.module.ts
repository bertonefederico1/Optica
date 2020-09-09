import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from "./material.module";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CustomersComponent } from './components/customers/customers/customers.component';
import { AddCustomerComponent } from './components/customers/add-customer/add-customer.component';
import { CustomerDataComponent } from './components/customers/customer-data/customer-data.component';

import { SuppliersComponent } from './components/suppliers/suppliers/suppliers.component';
import { AddSupplierComponent } from './components/suppliers/add-supplier/add-supplier.component';
import { SupplierDataComponent } from './components/suppliers/supplier-data/supplier-data.component';

import { HealthCaresComponent } from './components/healthCares/health-cares/health-cares.component';
import { AddHealthCareComponent } from './components/healthCares/add-health-care/add-health-care.component';
import { HealthCaresPerCustomerComponent } from './components/healthCares/health-cares-per-customer/health-care-per-customer.component';

import { LensesComponent } from './components/lenses/lenses/lenses.component';
import { AddLensComponent } from './components/lenses/add-lens/add-lens.component';
import { LensDataComponent } from './components/lenses/lens-data/lens-data.component';

import { FramesComponent } from './components/frames/frames/frames.component';
import { AddFrameComponent } from './components/frames/add-frame/add-frame.component';
import { DataFrameComponent } from './components/frames/data-frame/data-frame.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PrescriptionsComponent } from './components/prescriptions/prescriptions/prescriptions.component';
import { AddPrescriptionComponent } from './components/prescriptions/add-prescription/add-prescription.component';
import { PrescriptionsPerCustomerComponent } from './components/prescriptions/prescriptions-per-customer/prescriptions-per-customer.component';
import { SelectCustomerComponent } from './components/customers/select-customer/select-customer.component';
import { DataPrescriptionComponent } from './components/prescriptions/data-prescription/data-prescription.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    AddCustomerComponent,
    CustomerDataComponent,
    SuppliersComponent,
    AddSupplierComponent,
    SupplierDataComponent,
    HealthCaresComponent,
    AddHealthCareComponent,
    LensesComponent,
    AddLensComponent,
    LensDataComponent,
    FramesComponent,
    AddFrameComponent,
    DataFrameComponent,
    HealthCaresPerCustomerComponent,
    LoginComponent,
    HomeComponent,
    PrescriptionsComponent,
    AddPrescriptionComponent,
    PrescriptionsPerCustomerComponent,
    SelectCustomerComponent,
    DataPrescriptionComponent
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
