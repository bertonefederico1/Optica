import { NgModule } from "@angular/core";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from "@angular/material/input";


@NgModule({
    imports: [
        MatTableModule,
        MatPaginatorModule,
        MatInputModule 
    ],
    exports: [
        MatTableModule,
        MatPaginatorModule,
        MatInputModule 
    ]
})


export class MaterialModule {

}