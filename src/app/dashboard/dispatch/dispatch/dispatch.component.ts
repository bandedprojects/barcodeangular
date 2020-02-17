import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AppDialogComponent } from 'src/app/app-dialog/app-dialog.component';
import { BatchService } from '../../batch/batch.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.css']
})
export class DispatchComponent implements OnInit {
  dispatchForm: FormGroup;
  batchesList = [];
  fileUrl;
  filename;
  batchtypes: any[] = [
    {value: 'KI', viewValue: 'KI'},
    {value: 'KB', viewValue: 'KB'},
    {value: 'KH', viewValue: 'KH'},    
    {value: 'IC', viewValue: 'IC'},    
    {value: 'HC', viewValue: 'HC'},
    {value: 'BC', viewValue: 'BC'}
  ];

  constructor(private batchService: BatchService,private dialog: MatDialog,private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.dispatchForm = new FormGroup({
      batchname: new FormControl('',Validators.required),
      batchtype: new FormControl('')
    });

    this.batchService.getBatchList().subscribe(responseData => {
      if(responseData.status == "1") {
        this.batchesList = responseData.data.batches;
      }
    });  
  }

  onDownload() {
    let dialogConfig;
 
    let batch = this.batchesList.find(element => {
      if(element.batchtype == this.dispatchForm.value.batchtype && element.batchname == this.dispatchForm.value.batchname) {
        return element;
      }
    })

    if(batch) {
      let data = {
        "batchname": this.dispatchForm.value.batchname,
        "batchtype": this.dispatchForm.value.batchtype
      }
      this.filename = this.dispatchForm.value.batchname+"_dispatch.json"

      this.batchService.rejectedCylindersList(data).subscribe(responseData => {
        let rejection_list = [];
        if(responseData.status == '1') {    
          rejection_list = responseData.data.rejectionslist.map(element => element.serial_number);
        }     

        this.batchService.tareweightCylindersList(data).subscribe(responseData => {
          let tareWeightData = [];
          if(responseData.status == "1") {
            tareWeightData = responseData.data.tareweight.map(element => {
              return {
                serialno: element.serial_number,
                weight: element.weight
              }
            })                    
          }
          let json_data = {
            batchname: batch.batchname,
            rejectedCylinders: rejection_list,
            starting_serialno:batch.serial_start,
            ending_serialno:batch.serial_end,
            tareweight: tareWeightData
          }       
          const blob = new Blob([JSON.stringify(json_data)], { type: 'application/json' }); 
          this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
          let url = window.URL.createObjectURL(blob);
        //window.open(url);
            const element = document.createElement('a');
          element.href = url;
          element.download = this.filename;
          document.body.appendChild(element);
          element.click();            
        })
        
      });
    } else {
      let dialogConfig = {
        description: "Invalid Batch Name"
      }
      this.dialog.open(AppDialogComponent, { 
        data: dialogConfig
      });              
      return;
    }
  }

}
