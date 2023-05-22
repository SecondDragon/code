import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GaodeMapComponent } from '@app/pages/feat/charts/gaode-map/gaode-map.component';

const routes: Routes = [{ path: '', component: GaodeMapComponent, data: { title: '高德', key: 'gaode-map' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GaodeMapRoutingModule {}
