import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatMenuModule,
  MatToolbarModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatListModule,
  MatTableModule,
  MatDialogModule,
  MatSelectModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, 
    MatListModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatCheckboxModule, 
    MatMenuModule, 
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule
  ],
  exports: [
    MatButtonModule, 
    MatListModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatCheckboxModule, 
    MatMenuModule, 
    MatToolbarModule, 
    MatCardModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule
  ]
})
export class MaterialModule {}
