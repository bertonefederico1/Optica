import { NgModule } from "@angular/core";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
    imports: [
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatDialogModule,
        MatSelectModule,
        MatRadioModule,
        MatDatepickerModule,
        MatCheckboxModule
    ],
    exports: [
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatDialogModule,
        MatSelectModule,
        MatRadioModule,
        MatDatepickerModule,
        MatCheckboxModule
    ]
})


export class MaterialModule {

}