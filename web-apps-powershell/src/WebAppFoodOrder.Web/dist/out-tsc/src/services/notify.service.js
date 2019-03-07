import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
var NotifyService = /** @class */ (function () {
    function NotifyService(toastr) {
        this.toastr = toastr;
    }
    NotifyService.prototype.success = function (title, body) {
        this.toastr.success(title, body);
    };
    NotifyService.prototype.error = function (title, body) {
        this.toastr.error(title, body);
    };
    NotifyService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [ToastrService])
    ], NotifyService);
    return NotifyService;
}());
export { NotifyService };
//# sourceMappingURL=notify.service.js.map