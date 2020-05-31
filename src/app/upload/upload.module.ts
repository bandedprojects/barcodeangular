import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component'
import { FormsModule } from '@angular/forms';
import {NgxPrintModule} from 'ngx-print';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import {
  MatButtonModule,
  MatDialogModule,
  MatListModule,
  MatProgressBarModule,
} from '@angular/material'


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    FlexLayoutModule,
    MatProgressBarModule
  ],
  declarations: [UploadComponent],
  exports: [UploadComponent], 
  entryComponents: [UploadComponent],
})
export class UploadModule { }
