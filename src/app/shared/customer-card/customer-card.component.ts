import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OntimizeService } from 'ontimize-web-ngx';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.css'],
  encapsulation: ViewEncapsulation.None,
  host:{
    '[class.home-card]': 'true'
  }
})
export class CustomerCardComponent implements OnInit{
  public customerAmount: number;
  public vipCustomers: number;
  public normalCustomers: number;
  public otherCustomers: number;
  public basicCustomers: number;
  private subscription: Subscription;
  constructor(
    private ontimizeService: OntimizeService,
    private cd : ChangeDetectorRef
  ){
    this.ontimizeService.configureService(this.ontimizeService.getDefaultServiceConfiguration('customers'));
    this.subscription = this.ontimizeService.query(undefined, ['CUSTOMERID', 'CUSTOMERTYPEID'], 'customer').subscribe({
      next: (res: any) => {
        if (res.data && res.data.length) {
          this.customerAmount = res.data.length;
          this.vipCustomers = res.data.filter((e: any) => e['CUSTOMERTYPEID'] === 2).length;
          this.normalCustomers = res.data.filter((e: any) => e['CUSTOMERTYPEID'] === 1).length;
          this.otherCustomers = res.data.filter((e: any) => e['CUSTOMERTYPEID'] === 3).length;
          this.basicCustomers = this.customerAmount - this.vipCustomers - this.otherCustomers - this.normalCustomers;
        } else {
          this.customerAmount = undefined;
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
