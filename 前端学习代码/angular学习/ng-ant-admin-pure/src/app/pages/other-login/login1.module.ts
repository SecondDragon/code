import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { Login1RoutingModule } from './login1-routing.module';
import { Login1Component } from './login1.component';
import { NormalLoginComponent } from './normal-login/normal-login.component';

@NgModule({
  declarations: [Login1Component, NormalLoginComponent],
  imports: [SharedModule, Login1RoutingModule]
})
export class Login1Module {}
