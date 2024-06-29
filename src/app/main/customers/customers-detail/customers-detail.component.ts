import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OFormComponent, OTableComponent } from 'ontimize-web-ngx';
import { intRateMonthlyFunction } from 'src/app/shared/shared.module';
import { AddAccountComponent } from './add-account/add-account.component';

@Component({
  selector: 'app-customers-detail',
  templateUrl: './customers-detail.component.html',
  styleUrls: ['./customers-detail.component.css']
})
export class CustomersDetailComponent {

  @ViewChild('accountCustomerTable') accountTable: OTableComponent;
  @ViewChild('form') form: OFormComponent;
  public intRateMonthly = intRateMonthlyFunction;
  public longitude;
  public latitude;

  constructor(
    private router: Router,
    public dialog: MatDialog
  ) { }

  public openAccountDetailSelected() {
    let selected = this.accountTable.getSelectedItems();
    if (selected.length === 1) {
      let accountId = selected[0]['ACCOUNTID'];
      let customerId = selected[0]['CUSTOMERID'];
      this.router.navigate(['main/customers/' + customerId + '/' + accountId], { queryParams: { isdetail: true } });
    }
  }

  public createNewAccount() {
    let customerId = this.form.getFieldValue('CUSTOMERID');
    let date = new Date().getTime();
    this.dialog.open(AddAccountComponent, {
      data: {
        CUSTOMERID: customerId,
        STARTDATE: date
      }, disableClose: false
    })
  }

  onFormDataLoaded(data: any) {
    if (data.LATITUDE) {
      this.latitude = data.LATITUDE;
    }
    if (data.LONGITUDE) {
      this.longitude = data.LONGITUDE;
    }
  }

  hasGPSPositition() {
    if (this.latitude && this.longitude) {
      return true;
    }
    return false;
  }

  getPositionGPS() {
    return this.latitude + ',' + this.longitude;
  }

}