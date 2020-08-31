import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomersService } from '../../../services/customers/customers.service';
import { HealthCaresService } from '../../../services/healthCares/health-cares.service';
import { Customer } from '../../../models/Customer';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: []
})
export class AddCustomerComponent implements OnInit{


  constructor(
    private dialogRef: MatDialogRef<AddCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private customerService: CustomersService,
    private healthCareService: HealthCaresService
  ) { }

  healthCaresAvailables = [];
  customer: Customer = new Customer();
  nPartner: number = null;
  healthCare = '';


  ngOnInit(){  
    this.getObrasSocialesAvailables();
    if (this.data.edit) {
      this.getCustomer(this.data.customerID);
    };
  }


  getCustomer(customerID: number){
    this.customerService.getOne(customerID)
      .subscribe(
        res => {
          this.customer = res;
          this.customer.obrasSociales = [];
          res.obra_socials.map((os) => {
            const healthCare = {
              nsocio: os.cliente_obra_social.nroSocio,
              obraSocial: {
                idObraSocial: os.idObraSocial,
                nombre: os.nombre
              }
            }
            this.customer.obrasSociales.push(healthCare);
          })
        },
        err => console.log(err)
      )
  }

  
  addObraSocial(){
    if(this.nPartner !== null && this.healthCare !== ''){
      this.customer.obrasSociales.push({
        obraSocial: this.healthCare,
        nsocio: this.nPartner
      });
    } else{
      alert("Verifique los datos ingresados");
    }
    
  }


  deleteObraSocial(obrasSociales){
    this.customer.obrasSociales = obrasSociales;
  }


  getObrasSocialesAvailables(){
    this.healthCareService.getAll()
      .subscribe(
        res => this.healthCaresAvailables = res,
        err => console.log(err)
      )
  }


  cancel(){
    this.dialogRef.close();
  }


  onSubmit(){
    if (this.data.edit) {
      this.customerService.editCustomer(this.data.customerID, this.customer)
        .subscribe(
          res => this.dialogRef.close(),
          err => alert("Verifique los datos ingresados")
        )
    } else {
      this.customerService.addCustomer(this.customer)
      .subscribe(
        res => this.dialogRef.close(),
        err => alert("Verifique los datos ingresados")
      )
    }
  }

}
