import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ServiceModule } from 'src/services/service.module';
import { NavbarComponent } from './navbar/navbar.component';
import { EditMenuOptionComponent } from './menu-option/edit/edit-menu-option.component';
import { MenuOptionComponent } from './menu-option/menu-option.component';
import { CommonModule } from '@angular/common';
import { MenuOptionResolver } from './menu-option/menu-option.resolver';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './order/orders.component';
import { OrdersResolver } from './order/orders.resolver';
import { CompletedOrdersResolver } from './order/completed-orders.resolver';
import { MomentModule } from 'ngx-moment';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                AppComponent,
                CartComponent,
                EditMenuOptionComponent,
                HomeComponent,
                MenuOptionComponent,
                NavbarComponent,
                OrdersComponent
            ],
            imports: [
                BrowserModule,
                AppRoutingModule,
                ServiceModule,
                CommonModule,
                ReactiveFormsModule,
                MomentModule
            ],
            providers: [
                CompletedOrdersResolver,
                MenuOptionResolver,
                OrdersResolver
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map