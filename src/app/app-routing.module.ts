import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'customersList', loadChildren: () => import('./pages/customers/list/list.module').then(m => m.ListModule) }, 
                        { path: 'customersNew', loadChildren: () => import('./pages/customers/new/new.module').then(m => m.NewModule) }, 
                        { path: 'customersDetail', loadChildren: () => import('./pages/customers/detail/detail.module').then(m => m.DetailModule) }, 
                        { path: 'customersEdit', loadChildren: () => import('./pages/customers/edit/edit.module').then(m => m.EditModule) },
                        { path: 'vehiclesEdit', loadChildren: () => import('./pages/vehicles/edit/edit.module').then(m => m.EditModule) },
                        { path: 'vehiclesNew', loadChildren: () => import('./pages/vehicles/new/new.module').then(m => m.NewModule) },
                        { path: 'vehiclesDetail', loadChildren: () => import('./pages/vehicles/detail/detail.module').then(m => m.DetailModule) },
                        { path: 'vehiclesList', loadChildren: () => import('./pages/vehicles/list/list.module').then(m => m.ListModule) },
                        { path: 'productsNew', loadChildren: () => import('./pages/products/new/new.module').then(m => m.NewModule) },
                        { path: 'productsEdit', loadChildren: () => import('./pages/products/edit/edit.module').then(m => m.EditModule) },
                        { path: 'productsDetail', loadChildren: () => import('./pages/products/detail/detail.module').then(m => m.DetailModule) },
                        { path: 'productsList', loadChildren: () => import('./pages/products/list/list.module').then(m => m.ListModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
