import { Component, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material';

import { UploadService } from './upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  @ViewChild('file', { static: false }) file;
  public files: Set<File> = new Set();
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;
  constructor(private dialog:MatDialog) { }

  
}
