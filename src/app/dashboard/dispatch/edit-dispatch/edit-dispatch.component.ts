import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MatTableDataSource} from '@angular/material';
import { MatDialog, MatDialogConfig} from '@angular/material';

import { AppDialogComponent } from 'src/app/app-dialog/app-dialog.component';
import { BatchItem } from '../../batch/batch-item.model';
import { BatchService } from '../../batch/batch.service';

@Component({
  selector: 'app-edit-dispatch',
  templateUrl: './edit-dispatch.component.html',
  styleUrls: ['./edit-dispatch.component.css']
})
export class EditDispatchComponent implements OnInit {

  prepareBatchForm: FormGroup;
 
  batchName = "";
  batches = [];
 
  batchtypes: any[] = [
    {value: 'KI', viewValue: 'KI'},
    {value: 'KB', viewValue: 'KB'},
    {value: 'KH', viewValue: 'KH'},    
    {value: 'IC', viewValue: 'IC'},    
    {value: 'HC', viewValue: 'HC'},
    {value: 'BC', viewValue: 'BC'}
  ];
  displayedColumns: string[] = ['serial_no1', 'audited1','serial_no2','audited2','serial_no3','audited3','serial_no4','audited4','serial_no5','audited5','serial_no6','audited6'];  
  //dataSource = new BehaviorSubject([]);
  dataSource = new MatTableDataSource<BatchItem>();
  
  batch: BatchItem[] = [];
  filterForm: FormGroup;
  displayBatchSection = false;
  lastSerialNumber = 0;
  start = 0
  end = 100;
  total_cylinder;
  today: number;
  TareWeightPostData: {};
  tareWeghtBkp = [];

  constructor(private batchService: BatchService, private dialog:MatDialog) { }

  ngOnInit() {
    this.prepareBatchForm = new FormGroup({
      batchtype: new FormControl(''),
      batch_name: new FormControl('')
    });    
    
    this.batchService.getBatchList()
    .subscribe(responseData => {
      this.batches = responseData.data.batches;      
    });


    this.filterForm = new FormGroup({
      filterValue: new FormControl('')
    });

    this.filterForm.patchValue({
      filterValue: 'All'
    });
  
  }

  batchTypeSelect() {
    
  }

  onFilterChange() {
    const value = this.filterForm.value.filterValue;
    if(value == 'All') {
      this.dataSource.data = this.batchService.prepareDispatchDataSource(this.tareWeghtBkp);
      //this.dataSource.data = this.searchData;
    }  else {
      let filteredTareWeight = this.tareWeghtBkp.filter(element => element.dispatch_status == value);
      console.log(filteredTareWeight);
      this.dataSource.data = this.batchService.prepareDispatchDataSource(filteredTareWeight);
    }

  }

  changeDispatch(slno) {
    console.log('in change dispatch'+slno);
  }

  onChange(event,slno) {
    // can't event.preventDefault();
   
    let data = {
      serialnumber: slno,
      dispatch_status: (event.checked ? '1' : '0'),
      batchname: this.prepareBatchForm.value.batch_name,
      batchtype: this.prepareBatchForm.value.batchtype
    }
    this.batchService.changeDispatch(data).subscribe(responseData => {
      this.updateDispatch();
      let dialogConfig;
      if(responseData.status == '2') {
        dialogConfig = {
          description: "Tare weight inform not found. This info has never been updated."          
        }
        event.checked = false;
      } else if(responseData.status == '1') {
        dialogConfig = {
          description: "Dispatch Successfully Updated."
        }
      } else {
        dialogConfig = {
          description: "Error updating Tare weight."
        }
      }

      let dialogRef = this.dialog.open(AppDialogComponent, { 
        data: dialogConfig
      });
    });
  }

  updateDispatch() {
    this.batchService.tareweightCylindersList(this.TareWeightPostData).subscribe(responseData => {
      let tareweight_cylinders = {};
      var dialogConfig = {};
      if(responseData.status == '1') {
         this.tareWeghtBkp = tareweight_cylinders = responseData.data.tareweight;
         this.displayBatchSection = true;
         this.dataSource.data = this.batchService.prepareDispatchDataSource(tareweight_cylinders);                 
      } else if(responseData.status == '0') {
        dialogConfig = {
          description: "Tareweight list is empty."
        }
        let dialogRef = this.dialog.open(AppDialogComponent, { 
          data: dialogConfig
        });
        return;
      }
    });  
  }

  onSubmit() {  
    if(this.batches.length) {
      const serialno = parseInt(this.prepareBatchForm.value.serialno);
      const batchtype = this.prepareBatchForm.value.batchtype;
      this.TareWeightPostData = {
        "batchname": this.prepareBatchForm.value.batch_name,
        "batchtype": this.prepareBatchForm.value.batchtype
      };
      const searchBatch = this.batches.find(element => {
        if(element.batchtype == batchtype && element.batchname == this.prepareBatchForm.value.batch_name) {
          return element;
        }
      });

      if(searchBatch && searchBatch.batchname) {
        let start = searchBatch.serial_start;
        let end = searchBatch.serial_end;
        var dialogConfig = {};
        let error = false;
        if(this.prepareBatchForm.value.batch_name.indexOf('-') != -1) {
          dialogConfig = {
            description: "Invalid character '-' in batchname."
          }
          error = true;
        }         

        if(error) {
          this.displayBatchSection = false;
          let dialogRef = this.dialog.open(AppDialogComponent, { 
            data: dialogConfig
          });
          return;
        }

        this.updateDispatch();       
      }
    }  
  }

}
