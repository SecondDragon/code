import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    SharedModule,
    WelcomeRoutingModule
  ]
})
export class WelcomeModule { }
