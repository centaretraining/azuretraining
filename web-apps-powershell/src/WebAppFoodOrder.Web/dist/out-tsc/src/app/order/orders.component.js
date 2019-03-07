import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/services/order.service';
import { take, map, flatMap } from 'rxjs/operators';
var OrdersComponent = /** @class */ (function () {
    function OrdersComponent(route, orderService) {
        this.route = route;
        this.orderService = orderService;
    }
    OrdersComponent.prototype.ngOnInit = function () {
        this.orders = this.route.snapshot.data.orders;
        this.completedOrders = this.route.snapshot.data.completedOrders;
    };
    OrdersComponent.prototype.completeOrder = function (id) {
        var _this = this;
        this.orderService.completeOrder(id)
            .pipe(take(1), flatMap(function () { return _this.orderService.getActiveOrders(); }), map(function (newOrders) { _this.orders = newOrders; }), flatMap(function () { return _this.orderService.getCompletedOrders(); }), map(function (compltedOrders) { _this.completedOrders = compltedOrders; })).subscribe();
    };
    OrdersComponent.prototype.getCost = function (order) {
        return this.orderService.getCost(order);
    };
    OrdersComponent = tslib_1.__decorate([
        Component({
            templateUrl: 'orders.component.html',
            styleUrls: ['orders.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, OrderService])
    ], OrdersComponent);
    return OrdersComponent;
}());
export { OrdersComponent };
//# sourceMappingURL=orders.component.js.map