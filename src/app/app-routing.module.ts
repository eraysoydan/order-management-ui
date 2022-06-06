import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { OrderListComponent } from './order-list/order-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'order-list' },
  { path: 'order-list', component: OrderListComponent },
  { path: 'order-edit', component: OrderEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
