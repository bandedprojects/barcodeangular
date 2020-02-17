import { Component, OnInit } from '@angular/core';
import { BatchService } from '../../batch/batch.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { BatchItem } from '../../batch/batch-item.model';
import { MatDialog } from '@angular/material/dialog';
import { AppDialogComponent } from 'src/app/app-dialog/app-dialog.component';

@Component({
  selector: 'app-tareweight',
  templateUrl: './tareweight.component.html',
  styleUrls: ['./tareweight.component.css']
})
export class TareweightComponent implements OnInit {
  tareweightReportForm: FormGroup;
  showReport = false;
  tareweight_completed = "";
  dataSource = new MatTableDataSource<BatchItem>();
  batchesList = [];
  batchName = "";
  displayedColumns: string[] = ['serial_no1', 'tare_weight1', 'tareweight1','serial_no2', 'tare_weight2', 'tareweight2'];
  batch: any;
  serial_start;
  serial_end;
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
    this.tareweightReportForm = new FormGroup({
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
   
    this.batchName = this.tareweightReportForm.value.batch_name;

    let data = {
      "batchname": this.batchName,
      "batchtype": this.tareweightReportForm.value.batchtype
    };

    this.batch = this.batchesList.find(element => {
      if(element.batchtype == this.tareweightReportForm.value.batchtype && element.batchname == this.tareweightReportForm.value.batch_name) {
        return element;
      }
    });  


    if(this.batch) {
      this.serial_start = this.batch.serial_start;
      this.serial_end = this.batch.serial_end;
    } else {
      let dialogConfig = {
        description: "Invalid Batch Name"
      }
      this.dialog.open(AppDialogComponent, { 
        data: dialogConfig
      });              
      return;
    }

   
      
    this.batchService.tareweightCylindersList(data).subscribe(responseData => {
      let tareweight_cylinders = [];
      const total_cylinders = (this.batch.serial_end - this.batch.serial_start) + 1;
      this.tareweight_completed = '0/'+total_cylinders;
      if(responseData.status == '1') {
         tareweight_cylinders = responseData.data.tareweight;
         console.log(tareweight_cylinders.length);
         this.tareweight_completed = tareweight_cylinders.length+'/'+total_cylinders;
      }

      this.dataSource.data = this.batchService.prepareTareWeigthReportDataSource(this.batch.serial_start, this.batch.serial_end, tareweight_cylinders);    
      this.showReport = true;
    }) 
  }

}
