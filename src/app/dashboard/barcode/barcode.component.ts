import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BatchService } from '../batch/batch.service';
import { MatDialog } from '@angular/material/dialog';
import { AppDialogComponent } from 'src/app/app-dialog/app-dialog.component';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.css']
})
export class BarcodeComponent implements OnInit {
  printBarcodeForm: FormGroup;
  batchesList = [];
  barcode_weight;
  serial_no;

 
  showBarCode = false;


  constructor(private batchService: BatchService, private dialog: MatDialog) { }

  ngOnInit() {
    this.printBarcodeForm = new FormGroup({
      batchname: new FormControl('',Validators.required),
      serialnumber: new FormControl('',Validators.required),
      weight: new FormControl('',Validators.required)
    });

    this.batchService.getBatchList().subscribe(responseData => {
      if(responseData.status == "1") {
        this.batchesList = responseData.data.batches;
      }
    });  
  }

  onSaveAndPrintClick() {    
    this.serial_no = this.printBarcodeForm.value.serialnumber;
    let dialogConfig;
 
    let batch = this.batchesList.find(element => element.batchname == this.printBarcodeForm.value.batchname)
    let found = this.batchesList.find(element => (parseInt(element.serial_start) <= parseInt(this.serial_no) && parseInt(element.serial_end) >= parseInt(this.serial_no)));   

    if(batch) {
      if(found) {
        let data = {
          "batchname": this.printBarcodeForm.value.batchname
        };
        this.batchService.rejectedCylindersList(data).subscribe(responseData => {
          let rejectionsList;
          if(responseData.status == '1') {    
            rejectionsList = responseData.data.rejectionslist
            let rejected_batch = rejectionsList.find(element => element.serial_number == this.serial_no);
            if(rejected_batch) {
              dialogConfig = {
                description: "Rejected Serial Number."+this.serial_no
              }
              this.dialog.open(AppDialogComponent, { 
                data: dialogConfig
              });              
              return;
            }
          }  

          this.barcode_weight = this.printBarcodeForm.value.weight.toFixed(1);
          
          this.batchService.saveBarCode(this.printBarcodeForm.value).subscribe(responseData => {
            if(responseData.status == '1') {              
              this.showBarCode = true;

            } else if(responseData.status == '3') {
              let cylinder = responseData.data.cylindername;
              dialogConfig = {
                description: "Tareweight exists for the cylinder "+cylinder+". Do you want to update",
                confirmDlg: true
              };

              const dialogRef = this.dialog.open(AppDialogComponent, { 
                data: dialogConfig
              });    
              
              dialogRef.afterClosed().subscribe(result => {
                if(result == 'yes') {
                  this.batchService.updateBarCode(this.printBarcodeForm.value).subscribe(responseData => {
                    if(responseData.status == '1') {
                      dialogConfig = {
                        description: "Success."
                      }
                      this.dialog.open(AppDialogComponent, { 
                        data: dialogConfig
                      });   
                      
                      this.showBarCode = true;
                    }
                  }); 
                }
              });  

            }
           
            return;
          })
           
        })  
      } else {
        dialogConfig = {
          description: "Invalid Serial Number."
        }
      }
    } else {
      dialogConfig = {
        description: "Invalid Batch Name."
      }
    }

    if(dialogConfig) {
      let dialogRef = this.dialog.open(AppDialogComponent, { 
        data: dialogConfig
      });
      this.showBarCode = false;
      return;
    } 
  }

}
