import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WebfeedPageRoutingModule } from './webfeed-routing.module';

import { WebfeedPage } from './webfeed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WebfeedPageRoutingModule
  ],
  declarations: [WebfeedPage]
})
export class WebfeedPageModule {}
