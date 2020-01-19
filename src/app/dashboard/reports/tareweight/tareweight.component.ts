import { Component, OnInit } from '@angular/core';
import { BatchService } from '../../batch/batch.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { BatchItem } from '../../batch/batch-item.model';

@Component({
  selector: 'app-tareweight',
  templateUrl: './tareweight.component.html',
  styleUrls: ['./tareweight.component.css']
})
export class TareweightComponent implements OnInit {
  tareweightReportForm: FormGroup;
  showReport = false;
  dataSource = new MatTableDataSource<BatchItem>();
  batchesList = [];
  batchName = "";
  displayedColumns: string[] = ['serial_no1', 'tare_weight1', 'tareweight1','serial_no2', 'tare_weight2', 'tareweight2'];
  batch: any;
  serial_start;
  serial_end;

  constructor(private batchService: BatchService) { }

  ngOnInit() {
    this.tareweightReportForm = new FormGroup({
      batch_name: new FormControl('')
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
      "batchname": this.batchName
    };

    this.batch = this.batchesList.find(element => element.batchname == this.batchName);  
    this.serial_start = this.batch.serial_start;
    this.serial_end = this.batch.serial_end;
      
    this.batchService.tareweightCylindersList(data).subscribe(responseData => {
      let tareweight_cylinders = {};

      if(responseData.status == '1') {
         tareweight_cylinders = responseData.data.tareweight;
      }

      this.dataSource.data = this.batchService.prepareTareWeigthReportDataSource(this.batch.serial_start, this.batch.serial_end, tareweight_cylinders);    
      this.showReport = true;
    }) 
  }

}
