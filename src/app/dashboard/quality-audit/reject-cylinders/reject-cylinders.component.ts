import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BatchService } from '../../batch/batch.service';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { AppDialogComponent } from 'src/app/app-dialog/app-dialog.component';

@Component({
  selector: 'app-reject-cylinders',
  templateUrl: './reject-cylinders.component.html',
  styleUrls: ['./reject-cylinders.component.css']
})
export class RejectCylindersComponent implements OnInit {
  searchSerialNoForm: FormGroup;
  rejectCylinderForm: FormGroup;
  showRejectForm = false;
  isReadonly = false;
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
    {value: 'KH', viewValue: 'KH'},    
    {value: 'IC', viewValue: 'IC'},    
    {value: 'HC', viewValue: 'HC'},
    {value: 'BC', viewValue: 'BC'}
  ];

  constructor(private batchService: BatchService, private dialog: MatDialog) { }

  ngOnInit() {
    this.searchSerialNoForm = new FormGroup({
      batchtype: new FormControl(''),
      serialno: new FormControl('')
    });  

    this.rejectCylinderForm = new FormGroup({
      batchname: new FormControl(''),
      batchtype: new FormControl(''),
      serialnumber: new FormControl(''),
      rejectiontype: new FormControl(''),
      comments: new FormControl('')
    });  

    this.batchService.getBatchList()
    .subscribe(responseData => {
      this.batches = responseData.data.batches;
      
    }
  );
  }

  invalidSerialNumber(batchtype) {
    let dialogRef = this.dialog.open(AppDialogComponent, { 
      data: {
        description: "Serial number not found in batch type "+batchtype
      }
    });
    this.showRejectForm = false;   
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
        this.showRejectForm = true;
        this.rejectCylinderForm.patchValue({
          batchname: searchBatch.batchname,
          serialnumber: serialno,
          batchtype: searchBatch.batchtype
        });     
        this.isReadonly = true;   
      } else {
        this.invalidSerialNumber(batchtype);           
      }           
    } else {
      let dialogRef = this.dialog.open(AppDialogComponent, { 
        data: {
          description: "No batch found "
        }
      });
      this.showRejectForm = false;
    }
    
  }

  onRejectSubmit() {
    this.batchService.rejectCylinder(this.rejectCylinderForm.value).subscribe(responseData => {
      let message = "";
      this.showRejectForm = false;
      this.rejectCylinderForm.reset();
      this.searchSerialNoForm.reset();

      if(responseData.status == "1") {
        message = "Cylinder has been rejected.";
      } else if(responseData.status == "2") {
        message = "cylinder already present in the rejected list. if you want to modify, please use modify rejections page.";
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
