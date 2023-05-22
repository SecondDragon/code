import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JudgeAuthGuard } from '@core/services/common/guard/judgeAuth.guard';
import { JudgeLoginGuard } from '@core/services/common/guard/judgeLogin.guard';

import { DefaultComponent } from './default.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    data: { shouldDetach: 'no', preload: true },
    canActivateChild: [], //JudgLoginGuard是token守卫 JudgAuthGuard是权限码守卫，根据你的需求来添加
    // canActivateChild: [JudgLoginGuard,JudgAuthGuard是权限码守卫],
    children: [
      {
        path: 'welcome',
        loadChildren: () => import('../../pages/welcome/welcome.module').then(m => m.WelcomeModule)
      },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule {}
