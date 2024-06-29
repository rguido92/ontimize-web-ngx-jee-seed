import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OntimizeService } from 'ontimize-web-ngx';
import { DonutChartConfiguration } from 'ontimize-web-ngx-charts';
import { Subscription } from 'rxjs';
import { OTranslateService } from "ontimize-web-ngx";


@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.home-card]': 'true',
    '[class.account-card]': 'true',
  }
})
export class AccountCardComponent implements OnInit {

  accountAmount: any;
  public chartParameters: DonutChartConfiguration;
  protected resData: Array<Object>;
  protected graphData: Array<Object>;
  protected criteriaValue = 5000;
  private subscription: Subscription;
  private translateServiceSubscription: Subscription;

  constructor(
    private ontimizeService: OntimizeService,
    private cd: ChangeDetectorRef,
    private translate: OTranslateService
  ) {
    this.chartParameters = new DonutChartConfiguration();
    this.chartParameters.showLeyend = false;
    this.chartParameters.margin.top = 0;
    this.chartParameters.margin.right = 0;
    this.chartParameters.margin.bottom = 0;
    this.chartParameters.margin.left = 0;
    this.chartParameters.labelType = 'value';
    this.chartParameters.labelSunbeamLayout = false;
    this.chartParameters.valueType = 'intGrouped';

    this.ontimizeService.configureService(this.ontimizeService.getDefaultServiceConfiguration('branches'));
    this.subscription = this.ontimizeService.query(void 0, ['ACCOUNTID', 'BALANCE'], 'accountBalance').subscribe({
      next: (res: any) => {
        if (res && res.data.length && res.code === 0) {
          this.resData = res.data;
          this.accountAmount = res.data.length;
          this.adaptResult(res.data);
        }
      },
      error: (err: any) => console.log(err),
      complete: () => this.cd.detectChanges()
    });

    this.translateServiceSubscription = this.translate.onLanguageChanged.subscribe(() => {
      this.adaptResult(this.resData)
    });
  }

  adaptResult(data: any) {
    if (data && data.length) {
      let values = this.processValues(data);
      // chart data
      this.graphData = values
    }
  }

  processValues(data: any) {
    let values = [];
    let minorValue = 0;
    let majorValue = 0;
    data.forEach((item: any, index: number) => {
      if (item['BALANCE'] >= this.criteriaValue) {
        majorValue++;
      } else {
        minorValue++;
      }
    });

    let lowerCrit = {
      'name': this.translate.get('UNDER'),
      'value': minorValue
    }

    let upperCrit = {
      'name': this.translate.get('OVER'),
      'value': majorValue
    }

    values.push(lowerCrit);
    values.push(upperCrit);
    return values;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.translateServiceSubscription.unsubscribe();
    }
  }
}