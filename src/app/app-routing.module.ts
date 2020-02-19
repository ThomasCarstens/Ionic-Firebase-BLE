import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BLE } from '@ionic-native/ble/ngx';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'details/:id',
    loadChildren: () => import('./pages/todo-details/todo-details.module').then( m => m.TodoDetailsPageModule)
  },
  { path: 'details', loadChildren: () => import('./pages/todo-details/todo-details.module').then( m => m.TodoDetailsPageModule)},
  {
    path: 'ble-details',
    loadChildren: () => import('./ble-details/ble-details.module').then( m => m.BleDetailsPageModule)
  },
  {
    path: 'webfeed',
    loadChildren: () => import('./webfeed/webfeed.module').then( m => m.WebfeedPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  providers: [
    BLE
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
