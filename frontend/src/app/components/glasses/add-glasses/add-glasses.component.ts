import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomersService } from 'src/app/services/customers/customers.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-glasses',
  templateUrl: './add-glasses.component.html',
  styles: [
  ]
})
export class AddGlassesComponent implements OnInit {

  constructor(
    private customerService: CustomersService
  ) { }


  glassesForm = new FormGroup({

  })

  addCustomer(){
  }

  addPrescription(){

  }

  addFrame(){

  }

  onSubmit(){

  }

  ngOnInit(): void {
  }

}
