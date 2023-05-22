import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login1', pathMatch: 'full' },
  { path: 'login1', loadChildren: () => import('./login1/login1.module').then(m => m.Login1Module) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtherLoginRoutingModule {}
