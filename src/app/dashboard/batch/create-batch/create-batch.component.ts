import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Batch } from '../batch.model';
import { BatchService } from '../batch.service';
import { AppDialogComponent } from '../../../app-dialog/app-dialog.component';

@Component({
  selector: 'app-create-batch',
  templateUrl: './create-batch.component.html',
  styleUrls: ['./create-batch.component.css']
})
export class CreateBatchComponent implements OnInit {
  createBatchForm: FormGroup;
  batchName = "";
  displayedColumns: string[] = ['name', 'sl_no_range','cylinders_count','rejections_count', 'status'];  
  batchtypes: any[] = [
    {value: 'KI', viewValue: 'KI'},
    {value: 'KB', viewValue: 'KB'},
    {value: 'KH', viewValue: 'KH'},    
    {value: 'IC', viewValue: 'IC'},
    {value: 'HC', viewValue: 'HC'},
    {value: 'BC', viewValue: 'BC'}
  ];
  //dataSource = new BehaviorSubject([]);
  dataSource = new MatTableDataSource<Batch>();
  lastSerialNumber = -1;
  
  batch: Batch[] = [];
  batchesList = [];
  displayBatchSection = false;

  constructor(private batchService: BatchService, private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.createBatchForm = new FormGroup({
      batchtype: new FormControl(''),
      batchname: new FormControl(''),
      serial_start: new FormControl(''),
      serial_end: new FormControl(''),
      batch_creator: new FormControl(''),
      punching_instructor: new FormControl('')
    });  
   /* this.dataSource.data = this.batchService.getBatchDataSource();
    this.batchService.getBatchList().subscribe(responseData => {
      if(responseData.status == "1") {
        this.batchesList = responseData.data.batches;
      }
    });*/  


    /*this.batchService.getLastSerial().subscribe(responseData => {
      if(responseData.data.lastserialnuber) {
        this.lastSerialNumber = responseData.data.lastserialnuber;
        this.createBatchForm.patchValue({
          serial_start: this.lastSerialNumber
        });
        //this.createBatchForm.get('serial_start').disable();
      }      
    })*/
  }

  batchTypeSelect() {
    let data = {
      batchtype: this.createBatchForm.value.batchtype
    }

    this.batchService.getLastSerial(data).subscribe(responseData => {
      if(responseData.data.lastserialnuber) {
        this.lastSerialNumber = parseInt(responseData.data.lastserialnuber)+1;
        this.createBatchForm.patchValue({
          serial_start: this.lastSerialNumber
        })
      } else {
        this.lastSerialNumber = -1;
        this.createBatchForm.patchValue({
          serial_start: ""
        })
      }      
       
    })
  }

  onSubmit() {
    let start = this.createBatchForm.value.serial_start;
    let end = this.createBatchForm.value.serial_end;
    var dialogConfig = {};
    let error = false;

    if(this.createBatchForm.value.batchname.indexOf('-') != -1) {
      dialogConfig = {
        description: "Invalid character '-' in batchname."
      }
      error = true;
    } else if(this.lastSerialNumber && this.lastSerialNumber !=-1) {
      if(start < this.lastSerialNumber) {
        dialogConfig = {
          description: "Starting Serial number is not valid."
        }
        error = true;
      } else if(end <=this.lastSerialNumber) {
        error = true;
        dialogConfig = {
          description: "Ending Serial number is not valid."
        }
      }
    } else if(start ==undefined || start <= 0) {
      dialogConfig = {
        description: "Starting Serial number is not valid."
      }
      error = true;
    } else if(end <= start) {
      error = true;
        dialogConfig = {
          description: "Ending Serial number is not valid."
        }
    } 

    if(error) {
      let dialogRef = this.dialog.open(AppDialogComponent, { 
        data: dialogConfig
      });
      return;
    }

    this.batchService.createBatch(this.createBatchForm.value)
      .subscribe(responseData => {
        var dialogConfig = {};
        if(responseData.status == '1') {
          dialogConfig = {
            description: "Batch has been created successfully."
          }
        } else if(responseData.status == '0') {
          dialogConfig = {
            description: "Duplicate Batch name."
          }
        }

        let dialogRef = this.dialog.open(AppDialogComponent, { 
          data: dialogConfig
        });

        dialogRef.afterClosed().subscribe(result => {
          this.router.navigate(['/viewbatch']);
        });
      });
  }
  

}
