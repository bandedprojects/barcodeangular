import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { CreateBatchComponent } from './dashboard/batch/create-batch/create-batch.component';
import { PrepareBatchComponent } from './dashboard/batch/prepare-batch/prepare-batch.component';
import { ViewBatchComponent } from './dashboard/batch/view-batch/view-batch.component';
import { BatchComponent } from './dashboard/batch/batch.component';
import { RejectCylindersComponent } from './dashboard/quality-audit/reject-cylinders/reject-cylinders.component';
import { ModifyRejectionsComponent } from './dashboard/quality-audit/modify-rejections/modify-rejections.component';
import { RejectedCylindersComponent } from './dashboard/quality-audit/rejected-cylinders/rejected-cylinders.component';
import { HstreportsComponent } from './dashboard/reports/hstreports/hstreports.component';
import { PneumaticreportComponent } from './dashboard/reports/pneumatic/pneumaticreport/pneumaticreport.component';
import { BarcodeComponent } from './dashboard/barcode/barcode.component';
import { TareweightComponent } from './dashboard/reports/tareweight/tareweight.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'batch', component: BatchComponent, canActivate: [AuthGuard]},
  {path: 'createbatch', component: CreateBatchComponent, canActivate: [AuthGuard]},
  {path: 'preparebatch', component: PrepareBatchComponent, canActivate: [AuthGuard]},
  {path: 'viewbatch', component: ViewBatchComponent, canActivate: [AuthGuard]},  
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'modifyrejections', component: ModifyRejectionsComponent, canActivate: [AuthGuard]},  
  {path: 'rejectcylinders', component: RejectCylindersComponent, canActivate: [AuthGuard]},  
  {path: 'rejectedcylinders', component: RejectedCylindersComponent, canActivate: [AuthGuard]},  
  {path: 'hstreport', component: HstreportsComponent, canActivate: [AuthGuard]},  
  {path: 'pneumaticreport', component: PneumaticreportComponent, canActivate: [AuthGuard]},
  {path: 'tareweight', component: TareweightComponent, canActivate: [AuthGuard]},
  {path: 'printbarcode', component: BarcodeComponent, canActivate: [AuthGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
