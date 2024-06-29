import { Component } from '@angular/core';
import { OTranslateService } from 'ontimize-web-ngx';
import { PieChartConfiguration } from 'ontimize-web-ngx-charts';

@Component({
  selector: 'app-accounts-detail',
  templateUrl: './accounts-detail.component.html',
  styleUrls: ['./accounts-detail.component.css']
})
export class AccountsDetailComponent {
  public movementTypesChartParams:PieChartConfiguration;
  
  constructor(private translateService:OTranslateService){
    this._configurePieChart();
  }
  private _configurePieChart() {
   this.movementTypesChartParams = new PieChartConfiguration();
    this.movementTypesChartParams.margin.top=0;
    this.movementTypesChartParams.margin.bottom=0;
    this.movementTypesChartParams.margin.left=0;
    this.movementTypesChartParams.margin.right=0;
    this.movementTypesChartParams.legendPosition='right';
  }
}
