import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
//import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-app-dialog',
  templateUrl: './app-dialog.component.html',
  styleUrls: ['./app-dialog.component.css']
})
export class AppDialogComponent implements OnInit {  
  description:string;
  confirmDlg:boolean;

  constructor(private dialogRef: MatDialogRef<AppDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
      this.description = data.description;
      this.confirmDlg = data.confirmDlg != undefined ? data.confirmDlg : false;
    }

  ngOnInit() {
    /*this.form = this.fb.group({
      description: [this.description, []]
  });*/
  }

  save() {
    //this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close('close');
  }  

  yes() {
    this.dialogRef.close('yes');
  }

}
