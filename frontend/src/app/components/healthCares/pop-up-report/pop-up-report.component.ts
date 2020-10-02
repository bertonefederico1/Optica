import { Component, Inject, OnInit } from '@angular/core';
import * as html2pdf from 'html2pdf.js'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-report',
  templateUrl: './pop-up-report.component.html',
  styles: [
  ]
})
export class PopUpReportComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<PopUpReportComponent>,
    @Inject (MAT_DIALOG_DATA) public data
  ) { }

  glasses: any;
  totalAmount: number;

  ngOnInit(): void {
    this.glasses = this.data.glasses;
    this.totalAmount = this.getTotalAmount();
  }

  generateReport(){
    const options = {
      filename: "Reporte Obra Social",
      margin: 2,
      image: {type: 'jpeg', quality: '0.98'},
      html2canvas: { },
      jsPDF: {orientation: 'portrait'}
    };
    const supportingDocument: Element = document.getElementById('report');
    html2pdf()
      .from(supportingDocument)
      .set(options)
      .toPdf()
      .get('pdf')
      .then((pdf) => {
        window.open(pdf.output('bloburl'), '_blank');
      })
  }

  getTotalAmount(){
    const total = this.glasses.reduce((acum, element) => {
      return parseFloat(acum) + parseFloat(element.montoTotal)
    }, 0);
    return total;
  }

  calculateFarValue(farValue: any){
    const modifyDecimals = (decimals) => {
      if(decimals[1]){
        if(decimals[1].length === 1){
          decimals[1] = ''; 
          return decimals[1] + '0';
        } else if(decimals[1].length === 2){
          return '';
        };
      } else {
        return '.00';
      };
    }; 
    const decimals = farValue.toString().split('.');
    const decimalsTruncated = modifyDecimals(decimals);
    if(farValue > 0) {
      return '+' + farValue.toString() + decimalsTruncated;
    } else if(farValue < 0) {
      return '-' + farValue.toString() + decimalsTruncated;
    }
  }


}
