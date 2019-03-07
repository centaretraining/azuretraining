import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditMenuOptionComponent } from './menu-option/edit/edit-menu-option.component';
import { MenuOptionResolver } from './menu-option/menu-option.resolver';
import { OrdersComponent } from './order/orders.component';
import { OrdersResolver } from './order/orders.resolver';
import { CompletedOrdersResolver } from './order/completed-orders.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'menuoption/add',
    component: EditMenuOptionComponent
  },
  {
    path: 'menuoption/edit/:id',
    component: EditMenuOptionComponent,
    resolve: {
      menuOption: MenuOptionResolver
    }
  },
  {
    path: 'orders',
    component: OrdersComponent,
    resolve: {
      orders: OrdersResolver,
      completedOrders: CompletedOrdersResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
