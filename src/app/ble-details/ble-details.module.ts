import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BleDetailsPageRoutingModule } from './ble-details-routing.module';

import { BleDetailsPage } from './ble-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BleDetailsPageRoutingModule
  ],
  declarations: [BleDetailsPage]
})
export class BleDetailsPageModule {}
