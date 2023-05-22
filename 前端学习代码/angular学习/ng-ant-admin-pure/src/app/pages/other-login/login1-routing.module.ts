import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Login1Component } from '@app/pages/other-login/login1.component';

const routes: Routes = [
  {
    path: '',
    component: Login1Component,
    data: { key: 'login', shouldDetach: 'no' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Login1RoutingModule {}
