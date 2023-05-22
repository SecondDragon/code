import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: 'analysis', loadChildren: () => import('./analysis/analysis.module').then(m => m.AnalysisModule)},
  {path: 'monitor', loadChildren: () => import('./monitor/monitor.module').then(m => m.MonitorModule)},
  {path: 'workbench', loadChildren: () => import('./workbench/workbench.module').then(m => m.WorkbenchModule)},
  {path: '', redirectTo: 'analysis', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
