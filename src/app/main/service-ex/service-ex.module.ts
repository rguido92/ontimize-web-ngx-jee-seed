import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { ServiceExRoutingModule } from './service-ex-routing.module';
import { ServiceExHomeComponent } from './service-ex-home/service-ex-home.component';
import { ServiceExDetailsComponent } from './service-ex-details/service-ex-details.component';
import { StarsWarsService } from 'src/app/shared/star-wars.service';



@NgModule({
  declarations: [
    ServiceExHomeComponent,
    ServiceExDetailsComponent
  ],
  imports: [
    CommonModule,
    OntimizeWebModule,
    ServiceExRoutingModule
  ],
  providers: [{
    provide: 'starWars',
    useValue: StarsWarsService
  }]
})
export class ServiceExModule { }