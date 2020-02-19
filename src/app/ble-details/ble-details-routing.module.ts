import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BleDetailsPage } from './ble-details.page';

const routes: Routes = [
  {
    path: '',
    component: BleDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BleDetailsPageRoutingModule {}
