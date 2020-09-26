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
import { OrdersComponent } from './components/orders/orders/orders.component';
import { AddOrderComponent } from './components/orders/add-order/add-order.component';
import { OrderDataComponent } from './components/orders/order-data/order-data.component';
import { SelectSupplierComponent } from './components/suppliers/select-supplier/select-supplier.component';
import { GlassesComponent } from './components/glasses/glasses/glasses.component';
import { AddGlassesComponent } from './components/glasses/add-glasses/add-glasses.component';
import { DataGlassesComponent } from './components/glasses/data-glasses/data-glasses.component';
import { SelectPrescriptionsComponent } from './components/prescriptions/select-prescriptions/select-prescriptions.component';
import { SelectFrameComponent } from './components/frames/select-frame/select-frame.component';
import { SelectLensStockComponent } from './components/lenses/select-lens-stock/select-lens-stock.component';
import { SelectLensOrderComponent } from './components/orders/select-lens-order/select-lens-order.component';
import { SupportingDocumentComponent } from './components/glasses/supporting-document/supporting-document.component';
import { SelectGlassesPendingComponent } from './components/glasses/select-glasses-pending/select-glasses-pending.component';
import { ReportHealthCareComponent } from './components/prescriptions/report-health-care/report-health-care.component';



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
    DataPrescriptionComponent,
    OrdersComponent,
    AddOrderComponent,
    OrderDataComponent,
    SelectSupplierComponent,
    GlassesComponent,
    AddGlassesComponent,
    DataGlassesComponent,
    SelectPrescriptionsComponent,
    SelectFrameComponent,
    SelectLensStockComponent,
    SelectLensOrderComponent,
    SupportingDocumentComponent,
    SelectGlassesPendingComponent,
    ReportHealthCareComponent
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
