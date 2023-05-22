import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoDataComponent } from '@app/pages/page-demo/except/no-data/no-data.component';

const routes: Routes = [{ path: '', component: NoDataComponent, data: { title: '无数据', key: 'no-data' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoDataRoutingModule {}
