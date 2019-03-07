import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { take } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from 'src/services/order.service';
import { NotifyService } from 'src/services/notify.service';
var CartComponent = /** @class */ (function () {
    function CartComponent(cartService, orderService, notifyService) {
        this.cartService = cartService;
        this.orderService = orderService;
        this.notifyService = notifyService;
    }
    CartComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.order = this.cartService.getCart();
        this.cost = this.orderService.getCost(this.order);
        this.cartService.cartChanged.subscribe(function (newOrder) {
            _this.order = newOrder;
            _this.cost = _this.orderService.getCost(_this.order);
        });
        this.nameFormControl = new FormControl(this.order.name ? this.order.name : '', Validators.required);
        this.form = new FormGroup({
            name: this.nameFormControl
        });
    };
    CartComponent.prototype.setName = function () {
        var name = this.nameFormControl.value;
        this.cartService.setName(name);
    };
    CartComponent.prototype.onSubmit = function () {
        var _this = this;
        this.cartService.submitCart().pipe(take(1)).subscribe(function (result) {
            if (result) {
                _this.notifyService.success('Order Successful!', "The order was submitted successfully.");
            }
            else {
                _this.notifyService.error('Error', 'There was an error submitting the order');
            }
        });
    };
    CartComponent = tslib_1.__decorate([
        Component({
            selector: 'app-cart',
            templateUrl: 'cart.component.html',
            styleUrls: ['cart.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [CartService,
            OrderService,
            NotifyService])
    ], CartComponent);
    return CartComponent;
}());
export { CartComponent };
//# sourceMappingURL=cart.component.js.map