import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/services/cart.service';
var MenuOptionComponent = /** @class */ (function () {
    function MenuOptionComponent(cartService) {
        this.cartService = cartService;
    }
    MenuOptionComponent.prototype.ngOnInit = function () {
        this.quantityFormControl = new FormControl(1, Validators.compose([
            Validators.required,
            Validators.pattern(/^[1-9]\d*\.?[0]*$/)
        ]));
        this.form = new FormGroup({
            quantity: this.quantityFormControl
        });
    };
    MenuOptionComponent.prototype.onSubmit = function () {
        this.cartService.addToCart(this.menuOption, this.quantityFormControl.value);
        this.form.reset({ quantity: 1 });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], MenuOptionComponent.prototype, "menuOption", void 0);
    MenuOptionComponent = tslib_1.__decorate([
        Component({
            selector: 'app-menu-option',
            templateUrl: 'menu-option.component.html',
            styleUrls: ['menu-option.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [CartService])
    ], MenuOptionComponent);
    return MenuOptionComponent;
}());
export { MenuOptionComponent };
//# sourceMappingURL=menu-option.component.js.map