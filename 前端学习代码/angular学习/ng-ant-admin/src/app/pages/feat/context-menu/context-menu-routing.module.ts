import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContextMenuComponent } from '@app/pages/feat/context-menu/context-menu.component';

const routes: Routes = [{ path: '', component: ContextMenuComponent, data: { title: '右键菜单', key: 'context-menu' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContextMenuRoutingModule {}
