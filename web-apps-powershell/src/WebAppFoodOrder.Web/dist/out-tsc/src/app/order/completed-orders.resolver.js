import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { OrderService } from 'src/services/order.service';
var CompletedOrdersResolver = /** @class */ (function () {
    function CompletedOrdersResolver(orderService) {
        this.orderService = orderService;
    }
    CompletedOrdersResolver.prototype.resolve = function (route, state) {
        return this.orderService.getCompletedOrders();
    };
    CompletedOrdersResolver = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [OrderService])
    ], CompletedOrdersResolver);
    return CompletedOrdersResolver;
}());
export { CompletedOrdersResolver };
//# sourceMappingURL=completed-orders.resolver.js.map