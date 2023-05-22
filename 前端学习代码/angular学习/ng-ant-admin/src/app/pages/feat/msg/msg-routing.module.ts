import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MsgComponent } from '@app/pages/feat/msg/msg.component';

const routes: Routes = [{ path: '', component: MsgComponent, data: { title: '消息提示', key: 'msg' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MsgRoutingModule {}
