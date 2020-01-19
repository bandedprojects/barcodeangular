import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BatchService } from '../../batch/batch.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { AppDialogComponent } from 'src/app/app-dialog/app-dialog.component';

@Component({
  selector: 'app-rejected-cylinders',
  templateUrl: './rejected-cylinders.component.html',
  styleUrls: ['./rejected-cylinders.component.css']
})
export class RejectedCylindersComponent implements OnInit {
  searchBatchNameForm: FormGroup;
  filterForm: FormGroup;
  searchData = [];
  displayRejectedCylinders = false;
  options: string[] = ['One', 'Two', 'Three'];
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['position','batchname', 'serial_number','rejection_type','comments'];  
  rejection_types : any[] = ['All'];

  constructor(private batchService: BatchService, private dialog: MatDialog) { }

  ngOnInit() {
    this.searchBatchNameForm = new FormGroup({
      batchname: new FormControl('')
    });  
    this.filterForm = new FormGroup({
      filterValue: new FormControl('')
    });

    this.filterForm.patchValue({
      filterValue: 'All'
    });
    this.displayRejectedCylinders = false;
  }

  onSearchClick() {
    let data = {
      "batchname": this.searchBatchNameForm.value.batchname
    }
    
    this.batchService.rejectedCylindersList(data).subscribe(responseData => {
      if(responseData.status == '1') {     
        this.displayRejectedCylinders = true; 
        this.filterForm.patchValue({
          filterValue: 'All'
        });
        this.searchData = this.dataSource.data = responseData.data.rejectionslist;
        let rejection_types_array = this.dataSource.data.map(element => element.rejection_type);
        rejection_types_array = [...new Set(rejection_types_array)];
        this.rejection_types = ['All',...rejection_types_array];
        this.searchBatchNameForm.reset();
      } else {
        this.displayRejectedCylinders = false;
        var message = "No Data Found";
        let dialogRef = this.dialog.open(AppDialogComponent, { 
          data: {
            description: message
          }
        });
      }
    })
  }

  onFilterChange() {
    const value = this.filterForm.value.filterValue;
    if(value == 'All') {
      this.dataSource.data = this.searchData;
    }  else {
      this.dataSource.data = this.searchData.filter(element => element.rejection_type == value);
    }

  }

}
