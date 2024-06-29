import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { OntimizeService } from 'ontimize-web-ngx';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.home-card]': 'true'
  }
})
export class EmployeeCardComponent implements OnInit {
  public employeeAmount: number;
  private subscription: Subscription;

  constructor(
    private ontimizeService: OntimizeService,
    private cd: ChangeDetectorRef,
  ) {
    this.ontimizeService.configureService(this.ontimizeService.getDefaultServiceConfiguration('employees'));
    this.subscription = this.ontimizeService.query(undefined, ['EMPLOYEEID'], 'employee').subscribe({
      next: (res: any) => {
        if (res.data && res.data.length) {
          this.employeeAmount = res.data.length;
        } else {
          this.employeeAmount = undefined;
        }
      },
      error: (err: any) => console.log(err),
      complete: () => this.cd.detectChanges()
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}