import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'customersList', loadChildren: () => import('./pages/customers/list/list.module').then(m => m.ListModule) }, 
                        { path: 'customersNew', loadChildren: () => import('./pages/customers/new/new.module').then(m => m.NewModule) }, 
                        { path: 'customersDetail', loadChildren: () => import('./pages/customers/detail/detail.module').then(m => m.DetailModule) }, 
                        { path: 'customersEdit', loadChildren: () => import('./pages/customers/edit/edit.module').then(m => m.EditModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
