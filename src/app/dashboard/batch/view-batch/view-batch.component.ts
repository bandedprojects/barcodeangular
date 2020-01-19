import { Component, OnInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material';
import { BatchService } from '../batch.service';
import { map } from 'rxjs/operators';
import { NavListService } from 'src/app/navigation/navlist.service';

@Component({
  selector: 'app-view-batch',
  templateUrl: './view-batch.component.html',
  styleUrls: ['./view-batch.component.css']
})
export class ViewBatchComponent implements OnInit {
  displayedColumns: string[] = ['batchname', 'serial_start','serial_end','total_cylinders'];  
  //dataSource = new BehaviorSubject([]);
  dataSource = new MatTableDataSource<any>();

  constructor(private batchService: BatchService,private navListService: NavListService) { }

  ngOnInit() {
    let nav = {
      name: 'batch',
      title: 'Batches',
      url: '/viewbatch',
      sidenav: [
          { name: 'Prepare Batch', url: '/preparebatch' },
          { name: 'Create Batch', url: '/createbatch' },
          { name: 'View Batch', url: '/viewbatch' }
      ]
  };
    this.navListService.onNavListChange(nav);
    this.batchService.getBatchList()
      .pipe(map(responseData => {
        const batchesArray = [];

        for(const key in responseData.data.batches) {
          const batch = responseData.data.batches[key];
          const total_cylinders = parseInt(batch.serial_end) - parseInt(batch.serial_start);

          batchesArray.push({
            batchname: batch.batchname,
            serial_start: batch.serial_start,
            serial_end: batch.serial_end,
            total_cylinders: total_cylinders + 1
          });
        }

        return batchesArray;

      }))
      .subscribe(batches => {        
        this.dataSource.data = batches;
      }
    );
  }

}
