import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsHomeComponent } from './accounts-home/accounts-home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountsNewComponent } from './accounts-new/accounts-new.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AddMovementComponent } from './add-movement/add-movement.component';


@NgModule({
  declarations: [
    AccountsHomeComponent,
    AccountsNewComponent,
    AddCustomerComponent,
    AddMovementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OntimizeWebModule,
    AccountsRoutingModule
  ]
})
export class AccountsModule { }