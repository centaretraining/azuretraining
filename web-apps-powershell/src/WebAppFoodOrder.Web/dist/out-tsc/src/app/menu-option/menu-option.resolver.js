import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { MenuService } from 'src/services/menu.service';
var MenuOptionResolver = /** @class */ (function () {
    function MenuOptionResolver(menuService) {
        this.menuService = menuService;
    }
    MenuOptionResolver.prototype.resolve = function (route, state) {
        var id = route.params.id;
        if (id && id !== null) {
            return this.menuService.getMenuOption(id);
        }
        return of(null);
    };
    MenuOptionResolver = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [MenuService])
    ], MenuOptionResolver);
    return MenuOptionResolver;
}());
export { MenuOptionResolver };
//# sourceMappingURL=menu-option.resolver.js.map