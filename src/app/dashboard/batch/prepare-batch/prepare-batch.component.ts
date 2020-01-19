import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MatTableDataSource} from '@angular/material';
import { MatDialog, MatDialogConfig} from '@angular/material';
import { BatchService } from '../batch.service';
import { BatchItem } from '../batch-item.model';
import { AppDialogComponent } from 'src/app/app-dialog/app-dialog.component';
//import { MatTable } from '@angular/material';



@Component({
  selector: 'app-prepare-batch',
  templateUrl: './prepare-batch.component.html',
  styleUrls: ['./prepare-batch.component.css']
})
export class PrepareBatchComponent implements OnInit {
  //@ViewChild(MatTable) table: MatTable<any>;
  prepareBatchForm: FormGroup;
  batchName = "";
 
  batchtypes: any[] = [
    {value: 'KI', viewValue: 'KI'},
    {value: 'KB', viewValue: 'IC'},
    {value: 'HC', viewValue: 'HC'},
    {value: 'BC', viewValue: 'BC'}
  ];
  displayedColumns: string[] = ['serial_no1', 'audited1','serial_no2','audited2','serial_no3','audited3','serial_no4','audited4','serial_no5','audited5','serial_no6','audited6'];  
  //dataSource = new BehaviorSubject([]);
  dataSource = new MatTableDataSource<BatchItem>();
  
  batch: BatchItem[] = [];
  displayBatchSection = false;
  lastSerialNumber = 0;
  start = 0
  end = 100;
  total_cylinder;
  today: number;

  constructor(private batchService: BatchService, private dialog:MatDialog) { }

  ngOnInit() {
    this.prepareBatchForm = new FormGroup({
      batchtype: new FormControl(''),
      batch_name: new FormControl(''),
      starting_serial_no: new FormControl(''),
      ending_serial_no: new FormControl('')
    });  

    this.batchService.getLastSerial().subscribe(responseData => {
      if(responseData.data.lastserialnuber) {
        this.lastSerialNumber = responseData.data.lastserialnuber;
        this.prepareBatchForm.patchValue({
          starting_serial_no: this.lastSerialNumber
        });
        //this.prepareBatchForm.get('starting_serial_no').disable();
      }      
    })
  }

  onSubmit() {     
    let start = this.prepareBatchForm.value.starting_serial_no;
    let end = this.prepareBatchForm.value.ending_serial_no;
    this.batchName = this.prepareBatchForm.value.batch_name;
    this.total_cylinder = end - start;
    this.dataSource.data = this.batchService.prepareBatchDataSource(start, end);
    if(this.dataSource.data.length) {
      this.displayBatchSection = true;
    }
    
    //this.dataSource.next([...this.data]);
    //this.dataSource.paginator = this.data;
    this.today = Date.now();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
    };

    const dialogRef = this.dialog.open(AppDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe( data => console.log(data));
  }

  


}
