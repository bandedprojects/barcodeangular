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
  Subslot = "";
  batchesList = [];
  barcode_weight;
  serial_no;
  barcode_slno;
  barcode_txt = "";
  batchtypes: any[] = [
    {value: 'KI', viewValue: 'KI'},
    {value: 'KB', viewValue: 'KB'},
    {value: 'KH', viewValue: 'KH'},    
    {value: 'IC', viewValue: 'IC'},    
    {value: 'HC', viewValue: 'HC'},
    {value: 'BC', viewValue: 'BC'}
  ];

  showBarCode = false;

  constructor(private batchService: BatchService, private dialog: MatDialog) { }

  ngOnInit() {
    this.printBarcodeForm = new FormGroup({
      batchname: new FormControl('',Validators.required),
      batchtype: new FormControl(''),
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
    this.barcode_slno = this.serial_no.toString().padStart(6,'0');
    const batchtype = this.printBarcodeForm.value.batchtype;

    let dialogConfig;
 
    let batch = this.batchesList.find(element => {
      if(element.batchtype == this.printBarcodeForm.value.batchtype && element.batchname == this.printBarcodeForm.value.batchname) {
        return element;
      }
    })
    let found = this.batchesList.find(element => {
      if(element.batchname == this.printBarcodeForm.value.batchname && element.batchtype == this.printBarcodeForm.value.batchtype && (parseInt(element.serial_start) <= parseInt(this.serial_no) && parseInt(element.serial_end) >= parseInt(this.serial_no))) {
        return element;
      } 
    });   

    if(batch) {
      if(found) {
        let data = {
          "batchname": this.printBarcodeForm.value.batchname,
          "batchtype": this.printBarcodeForm.value.batchtype
        };
        this.barcode_txt = this.printBarcodeForm.value.batchname+"-"+this.serial_no+"-"+this.printBarcodeForm.value.weight;
        console.log(this.barcode_txt);
        this.batchService.rejectedCylindersList(data).subscribe(responseData => {
          let rejectionsList;
          if(responseData.status == '1') {    
            rejectionsList = responseData.data.rejectionslist
            let rejected_batch = rejectionsList.find(element => element.serial_number == this.serial_no);
            if(rejected_batch) {
              dialogConfig = {
                description: "The Cylinder "+this.serial_no+"is already rejected in quality audit."
              }
              this.dialog.open(AppDialogComponent, { 
                data: dialogConfig
              });              
              return;
            }
          } 

          this.barcode_weight = parseFloat(this.printBarcodeForm.value.weight).toFixed(1)+"kg";
          this.Subslot = this.batchService.getSubSlot(this.serial_no,batch.serial_start);
          this.batchService.saveBarCode(this.printBarcodeForm.value).subscribe(responseData => {
            if(responseData.status == '1') {              
              this.showBarCode = true;
              this.printBarcodeForm.patchValue({
                serialnumber: "",
                weight: ""
              });
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
                      this.printBarcodeForm.patchValue({
                        serialnumber: "",
                        weight: ""
                      });
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

  refreshWeight() {
    this.batchService.getTareWeight().subscribe(responseData => {
      if(responseData.status == "1") {
        let tareweight = responseData.data.weight;
        console.log('weight'+tareweight);
        this.printBarcodeForm.patchValue({
          weight: tareweight
        })
      }
    });
    return false;  
  }

}
