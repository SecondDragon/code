import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'success', loadChildren: () => import('./success/success.module').then(m => m.SuccessModule)},
  {path: 'fail', loadChildren: () => import('./fail/fail.module').then(m => m.FailModule)},
  {path: '', redirectTo: 'role-manage', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultRoutingModule { }
