import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';
var OrderService = /** @class */ (function () {
    function OrderService(http, url) {
        this.http = http;
        this.url = url;
    }
    OrderService.prototype.completeOrder = function (id) {
        return this.http.post(this.url.buildUrl("/order/" + id + "/complete"), null);
    };
    OrderService.prototype.submitOrder = function (order) {
        return this.http.post(this.url.buildUrl('/order'), order);
    };
    OrderService.prototype.getActiveOrders = function () {
        return this.http.get(this.url.buildUrl('/order'));
    };
    OrderService.prototype.getCompletedOrders = function () {
        return this.http.get(this.url.buildUrl('/order/complete'));
    };
    OrderService.prototype.getCost = function (order) {
        var cost = 0;
        if (!order || !order.orderItems || order.orderItems.length <= 0) {
            return cost;
        }
        order.orderItems.forEach(function (orderItem) {
            cost += orderItem.menuOption.price * orderItem.quantity;
        });
        return cost;
    };
    OrderService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient, UrlService])
    ], OrderService);
    return OrderService;
}());
export { OrderService };
//# sourceMappingURL=order.service.js.map