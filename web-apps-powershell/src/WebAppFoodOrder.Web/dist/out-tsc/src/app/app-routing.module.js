import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditMenuOptionComponent } from './menu-option/edit/edit-menu-option.component';
import { MenuOptionResolver } from './menu-option/menu-option.resolver';
import { OrdersComponent } from './order/orders.component';
import { OrdersResolver } from './order/orders.resolver';
import { CompletedOrdersResolver } from './order/completed-orders.resolver';
var routes = [
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
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map