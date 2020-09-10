import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styles: [
  ]
})
export class AddOrderComponent implements OnInit {

  constructor() { }

  orderForm = new FormGroup({
    nameAndSurname: new FormControl({value: '', disabled: true}, Validators.required),
    telephone: new FormControl({value: '', disabled: true}, Validators.required),
    address: new FormControl({value: '', disabled: true}, Validators.required),
    supplierLaboratory: new FormControl({value: '', disabled: true}, Validators.required),
    currentDate: new FormControl({value: '', disabled: true}, Validators.required),
    expectedDeliveryDate: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
  }

}
