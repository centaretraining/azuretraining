import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';
var MenuService = /** @class */ (function () {
    function MenuService(http, url) {
        this.http = http;
        this.url = url;
    }
    MenuService.prototype.getMenuOptions = function () {
        return this.http.get(this.url.buildUrl('/menu'));
    };
    MenuService.prototype.getMenuOption = function (id) {
        return this.http.get(this.url.buildUrl("/menu/option/" + id));
    };
    MenuService.prototype.saveMenuOption = function (option) {
        return this.http.post(this.url.buildUrl('/menu/option'), option);
    };
    MenuService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient, UrlService])
    ], MenuService);
    return MenuService;
}());
export { MenuService };
//# sourceMappingURL=menu.service.js.map