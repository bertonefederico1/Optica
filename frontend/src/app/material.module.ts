import { NgModule } from "@angular/core";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
    imports: [
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatDialogModule,
        MatSelectModule
    ],
    exports: [
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatDialogModule,
        MatSelectModule
    ]
})


export class MaterialModule {

}