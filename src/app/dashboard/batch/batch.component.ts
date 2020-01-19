import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { Batch } from './batch.model';
import { BatchService } from './batch.service';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})

export class BatchComponent implements OnInit {
    
  
    constructor(private batchService: BatchService) { }
  
    ngOnInit() {
    }
    
  
  }
  