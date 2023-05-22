import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectivePreloadingStrategyService } from '@core/services/common/selective-preloading-strategy.service';

const routes: Routes = [
  { path: 'blank', loadChildren: () => import('./layout/blank/blank.module').then(m => m.BlankModule) },
  { path: 'login', loadChildren: () => import('./pages/other-login/login1.module').then(m => m.Login1Module) },
  { path: 'default', loadChildren: () => import('./layout/default/default.module').then(m => m.DefaultModule) },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: SelectivePreloadingStrategyService,
      scrollPositionRestoration: 'top',
      // initialNavigation: 'enabledBlocking',
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
