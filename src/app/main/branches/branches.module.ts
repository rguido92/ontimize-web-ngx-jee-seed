import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OntimizeWebModule } from 'ontimize-web-ngx';
import { BranchesRoutingModule } from './branches-routing.module';
import { BranchesHomeComponent } from './branches-home/branches-home.component';
import { BranchesDetailComponent } from './branches-detail/branches-detail.component';
import { BranchesNewComponent } from './branches-new/branches-new.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    BranchesHomeComponent,
    BranchesDetailComponent,
    BranchesNewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OntimizeWebModule,
    BranchesRoutingModule
  ]
})
export class BranchesModule { }
