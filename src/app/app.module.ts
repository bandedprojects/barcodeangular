import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {NgxPrintModule} from 'ngx-print';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './auth/auth.service';
import { UserService } from './auth/login/user.service';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { CreateBatchComponent } from './dashboard/batch/create-batch/create-batch.component';
import { PrepareBatchComponent } from './dashboard/batch/prepare-batch/prepare-batch.component';
import { BatchComponent } from './dashboard/batch/batch.component';
import { BatchService } from './dashboard/batch/batch.service';
import { NavListService } from "./navigation/navlist.service";
import { ViewBatchComponent } from './dashboard/batch/view-batch/view-batch.component';
import { AppDialogComponent } from './app-dialog/app-dialog.component';
import { RejectCylindersComponent } from './dashboard/quality-audit/reject-cylinders/reject-cylinders.component';
import { ModifyRejectionsComponent } from './dashboard/quality-audit/modify-rejections/modify-rejections.component';
import { RejectedCylindersComponent } from './dashboard/quality-audit/rejected-cylinders/rejected-cylinders.component';
import { HstreportsComponent } from './dashboard/reports/hstreports/hstreports.component';
import { PneumaticreportComponent } from './dashboard/reports/pneumatic/pneumaticreport/pneumaticreport.component';
import { BarcodeComponent } from './dashboard/barcode/barcode.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { TareweightComponent } from './dashboard/reports/tareweight/tareweight.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    SidenavComponent,
    CreateBatchComponent,
    PrepareBatchComponent,
    ViewBatchComponent,
    BatchComponent,
    AppDialogComponent,
    RejectCylindersComponent,
    ModifyRejectionsComponent,
    RejectedCylindersComponent,
    HstreportsComponent,
    PneumaticreportComponent,
    BarcodeComponent,
    TareweightComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPrintModule,
    NgxBarcodeModule
  ],
  providers: [AuthService, BatchService,NavListService, UserService],
  bootstrap: [AppComponent],
  entryComponents: [AppDialogComponent]
})
export class AppModule { }
