import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { OrderService } from 'src/services/order.service';
var OrdersResolver = /** @class */ (function () {
    function OrdersResolver(orderService) {
        this.orderService = orderService;
    }
    OrdersResolver.prototype.resolve = function (route, state) {
        return this.orderService.getActiveOrders();
    };
    OrdersResolver = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [OrderService])
    ], OrdersResolver);
    return OrdersResolver;
}());
export { OrdersResolver };
//# sourceMappingURL=orders.resolver.js.map