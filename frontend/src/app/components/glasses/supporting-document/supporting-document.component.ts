import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as moment from 'moment'
import * as html2pdf from 'html2pdf.js'
import { GlassesService } from './../../../services/glasses/glasses.service';

@Component({
  selector: 'app-supporting-document',
  templateUrl: './supporting-document.component.html',
  styles: [
  ]
})
export class SupportingDocumentComponent implements OnInit {

  constructor(
    private glassesService: GlassesService,
    private dialogRef: MatDialogRef<SupportingDocumentComponent>,
    @Inject (MAT_DIALOG_DATA) public data
  ) { }

  glasses: any;
  today = moment().format('DD/MM/yyyy');

  ngOnInit(): void {
    this.getOne(this.data.glassesNumber);
  }

  getOne(glassesNumber: number){
    this.glassesService.getOne(glassesNumber)
      .subscribe(res => this.glasses = res);
  }

  generateSupportingDocument(){
    const options = {
      filename: "Comprobante Anteojo",
      margin: 2,
      image: {type: 'svg', quality: '0.98'},
      html2canvas: { },
      jsPDF: {orientation: 'portrait'}
    };
    const supportingDocument: Element = document.getElementById('supportingDocument');
    html2pdf()
      .from(supportingDocument)
      .set(options)
      .toPdf()
      .get('pdf')
      .then((pdf) => {
        window.open(pdf.output('bloburl'), '_blank');
      })
  }

}
