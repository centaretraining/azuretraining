import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MenuService } from 'src/services/menu.service';
var HomeComponent = /** @class */ (function () {
    function HomeComponent(menuService) {
        this.menuService = menuService;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.menuService.getMenuOptions().subscribe(function (data) {
            _this.menuOptions = data;
        });
    };
    HomeComponent = tslib_1.__decorate([
        Component({
            templateUrl: 'home.component.html',
            styleUrls: ['home.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [MenuService])
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=home.component.js.map