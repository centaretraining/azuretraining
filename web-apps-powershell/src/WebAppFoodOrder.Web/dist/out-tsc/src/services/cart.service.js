import * as tslib_1 from "tslib";
import { Injectable, EventEmitter } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { OrderService } from './order.service';
import { of } from 'rxjs';
var SESSION_STORAGE_KEY = 'cart';
var CartService = /** @class */ (function () {
    function CartService(orderService) {
        this.orderService = orderService;
        this.cartChanged = new EventEmitter();
    }
    CartService.prototype.getCart = function () {
        var cart = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY));
        if (!cart) {
            cart = { orderItems: [] };
        }
        return cart;
    };
    CartService.prototype.addToCart = function (menuOption, quantity) {
        var cart = this.getCart();
        var foundIndex = cart.orderItems.findIndex(function (order) { return order.menuOption.id === menuOption.id; });
        if (foundIndex > -1) {
            cart.orderItems[foundIndex].quantity += quantity;
        }
        else {
            cart.orderItems.push({
                menuOption: menuOption,
                quantity: quantity
            });
        }
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(cart));
        this.cartChanged.emit(cart);
    };
    CartService.prototype.setName = function (name) {
        var cart = this.getCart();
        cart.name = name;
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(cart));
    };
    CartService.prototype.clearCart = function () {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
        this.cartChanged.emit();
    };
    CartService.prototype.submitCart = function () {
        var _this = this;
        var order = this.getCart();
        return this.orderService.submitOrder(order)
            .pipe(map(function () {
            _this.clearCart();
            return true;
        }), catchError(function (error) {
            console.error('There was an error submitting the order');
            console.error(error);
            return of(false);
        }));
    };
    CartService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [OrderService])
    ], CartService);
    return CartService;
}());
export { CartService };
//# sourceMappingURL=cart.service.js.map