import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Login1Component } from '@app/pages/other-login/login1/login1.component';

const routes: Routes = [
  {
    path: '',
    component: Login1Component,
    data: { title: '第一种登录', key: 'login1' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Login1RoutingModule {}
