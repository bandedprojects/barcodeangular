import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BatchItem } from '../../../batch/batch-item.model';
import { BatchService } from '../../../batch/batch.service';
import { MatDialog } from '@angular/material/dialog';
import { AppDialogComponent } from 'src/app/app-dialog/app-dialog.component';
import { Batch } from '../../../batch/batch.model';


@Component({
  selector: 'app-pneumaticreport',
  templateUrl: './pneumaticreport.component.html',
  styleUrls: ['./pneumaticreport.component.css']
})
export class PneumaticreportComponent implements OnInit {

  showHSTReport = false;
  generateReportForm: FormGroup;
  batchesList = [];
  batch: any;
  batchName = "";
  batchtypes: any[] = [
    {value: 'KI', viewValue: 'KI'},
    {value: 'KB', viewValue: 'KB'},
    {value: 'KH', viewValue: 'KH'},    
    {value: 'IC', viewValue: 'IC'},    
    {value: 'HC', viewValue: 'HC'},
    {value: 'BC', viewValue: 'BC'}
  ];
  displayedColumns: string[] = ['serial_no1', 'status1','serial_no2','status2','serial_no3','status3','serial_no4','status4','serial_no5','status5','serial_no6','status6'];  
  //dataSource = new BehaviorSubject([]);
  dataSource = new MatTableDataSource<BatchItem>();

  constructor(private batchService: BatchService, private dialog: MatDialog) { }

  ngOnInit() {
    this.generateReportForm = new FormGroup({
      batch_name: new FormControl(''),
      batchtype: new FormControl('')
    });

    this.batchService.getBatchList().subscribe(responseData => {
      if(responseData.status == "1") {
        this.batchesList = responseData.data.batches;
      }
    });  
  }

  onGenerateClick() {   
    this.batchName = this.generateReportForm.value.batch_name;

    let data = {
      "batchname": this.batchName
    };

    //this.batch = this.batchesList.find(element => element.batchname == this.batchName);  

    this.batch = this.batchesList.find(element => {
      if(element.batchtype == this.generateReportForm.value.batchtype && element.batchname == this.generateReportForm.value.batch_name) {
        return element;
      }
    });  

    if(this.batch) {
    
    } else {
      let dialogConfig = {
        description: "Invalid Batch Name"
      }
      this.dialog.open(AppDialogComponent, { 
        data: dialogConfig
      });              
      return;
    }
    this.batchService.rejectedCylindersList(data).subscribe(responseData => {
      let rejectionsList = {};
      if(responseData.status == '1') {    
          rejectionsList = responseData.data.rejectionslist
      } 

      this.dataSource.data = this.batchService.prepareReportDataSource(this.batch.serial_start, this.batch.serial_end, "Pneumatic", rejectionsList);    
      this.showHSTReport = true;
    });  
   
  }
}
