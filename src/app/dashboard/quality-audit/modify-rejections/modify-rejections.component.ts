import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BatchService } from '../../batch/batch.service';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { AppDialogComponent } from 'src/app/app-dialog/app-dialog.component';
import { element } from 'protractor';

@Component({
  selector: 'app-modify-rejections',
  templateUrl: './modify-rejections.component.html',
  styleUrls: ['./modify-rejections.component.css']
})
export class ModifyRejectionsComponent implements OnInit {
  searchSerialNoForm: FormGroup;
  modifyRejectionsForm: FormGroup;
  showRejectForm = false;
  batches = [];
  rejection_types: any[] = [
    {value: 'HST', viewValue: 'HST'},
    {value: 'Pneumatic', viewValue: 'Pneumatic Test'},
    {value: 'BIS', viewValue: 'BIS Audit'},
    {value: 'Custom', viewValue: 'Custom'}
  ];
  batchtypes: any[] = [
    {value: 'KI', viewValue: 'KI'},
    {value: 'KB', viewValue: 'KB'},
    {value: 'IC', viewValue: 'IC'},
    {value: 'HC', viewValue: 'HC'},
    {value: 'BC', viewValue: 'BC'}
  ];

  status_list: any[] = [
    {value: '1', viewValue: 'Rejected'},
    {value: '0', viewValue: 'OK'}
  ];

  constructor(private batchService: BatchService, private dialog: MatDialog) { }

  ngOnInit() {
    this.searchSerialNoForm = new FormGroup({
      batchtype: new FormControl(''),
      serialno: new FormControl('')
    });  

    this.modifyRejectionsForm = new FormGroup({
      batchname: new FormControl(''),
      serialnumber: new FormControl(''),
      rejectiontype: new FormControl(''),
      rejectionstatus: new FormControl(''),
      comments: new FormControl('')
    });  

    this.batchService.getBatchList()
    .subscribe(responseData => {
      this.batches = responseData.data.batches;      
    });

    this.modifyRejectionsForm.patchValue({
      status: "Rejected"
    });
  }

  invalidSerialNumber() {
    let dialogRef = this.dialog.open(AppDialogComponent, { 
      data: {
        description: "Serial number can not find in any batch."
      }
    });
    this.showRejectForm = false;   
  }

  showCustomMessage(message) {
    let dialogRef = this.dialog.open(AppDialogComponent, { 
      data: {
        description: message
      }
    });
  }

  onSearchClick() {
    
    if(this.batches.length) {
      const serialno = parseInt(this.searchSerialNoForm.value.serialno);
      const batchtype = this.searchSerialNoForm.value.batchtype;
      
      const searchBatch = this.batches.find(element => {
        if(element.batchtype == batchtype && (parseInt(element.serial_start) <= serialno && parseInt(element.serial_end) >= serialno)) {
          return element;
        }
      });

      if(searchBatch && searchBatch.batchname) {
        let data = {
          "batchname": searchBatch.batchname,
          "batchtype": searchBatch.batchtype
        }
        
        this.batchService.rejectedCylindersList(data).subscribe(responseData => {
          if(responseData.status == '1') {     
            
            const rejectedCylinder = responseData.data.rejectionslist.find(element => {
              if(element.serial_number == this.searchSerialNoForm.value.serialno) {
                return element;
              }
            });

            if(rejectedCylinder != undefined) {
              this.modifyRejectionsForm.patchValue({
                batchname: searchBatch.batchname,
                serialnumber: rejectedCylinder.serial_number,
                rejectiontype: rejectedCylinder.rejection_type,
                rejectionstatus: '1',
                comments:  rejectedCylinder.comments
              });       
              this.showRejectForm = true; 
            } else {
              this.showCustomMessage('Cylinder not found in rejected cylinders list');
              this.showRejectForm = false;
            }
           
          }
        });  
        
      } else {
        this.invalidSerialNumber();           
      }           
    } else {
      this.invalidSerialNumber();    
    }    
  }

  onRejectSubmit() {
    this.batchService.modifyRejection(this.modifyRejectionsForm.value).subscribe(responseData => {
      let message = "";

      if(responseData.status == '0') {
        message = "Success";
      } else if(responseData.status == "1") {
        message = "Cylinder Rejection updated.";
      } else if(responseData.status == "2") {
        message = "cylinder not present in the rejection list";
      } else {  
        message = "Failed to reject cylinder."
      }

      let dialogRef = this.dialog.open(AppDialogComponent, { 
        data: {
          description: message
        }
      });
    })
  }


}
