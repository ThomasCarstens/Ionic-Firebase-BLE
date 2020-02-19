import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebfeedPage } from './webfeed.page';

const routes: Routes = [
  {
    path: '',
    component: WebfeedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebfeedPageRoutingModule {}
