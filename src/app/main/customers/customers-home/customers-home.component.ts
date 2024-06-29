import { Component, ViewChild } from '@angular/core';
import { OTableButtonComponent, OntimizeService } from 'ontimize-web-ngx';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customers-home',
  templateUrl: './customers-home.component.html',
  styleUrls: ['./customers-home.component.css']
})
export class CustomersHomeComponent {

  public showWaitForLongTask = false;
  private subscription: Subscription;

  constructor(
    private ontimizeService: OntimizeService
  ) {
    this.ontimizeService.configureService(this.ontimizeService.getDefaultServiceConfiguration("customers"));
  }

  longTaskToBackend() {
    this.showWaitForLongTask = true;
    this.subscription = this.ontimizeService.query(undefined, [], 'longTask').subscribe({
      next: (res: any) => {
        console.log("Long task finished");
      },
      error: (err: any) => this.showWaitForLongTask = false,
      complete: () => this.showWaitForLongTask = false
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}