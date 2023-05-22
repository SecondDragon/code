import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LockLeaveGuard } from '@core/services/common/guard/lock-leave.guard';

import { BlankComponent } from './blank.component';

const routes: Routes = [
  {
    path: '',
    component: BlankComponent,
    data: { key: 'blank', shouldDetach: 'no' },
    children: [
      {
        canDeactivate: [LockLeaveGuard],
        path: 'empty-for-lock',
        loadChildren: () => import('../../shared/components/empty-for-lock/empty-for-lock.module').then(m => m.EmptyForLockModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlankRoutingModule {}
