import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Url from 'url-parse';
import * as queryString from 'querystring';
var UrlService = /** @class */ (function () {
    function UrlService() {
    }
    UrlService.prototype.buildUrl = function (path, queryParams) {
        var url = new Url(globalConfig.apiDomain);
        if (!path.startsWith('/')) {
            path = "/" + path;
        }
        url.set('pathname', "" + environment.baseApiPath + path);
        if (queryParams) {
            url.set('query', queryString.stringify(queryParams));
        }
        return url.toString();
    };
    UrlService = tslib_1.__decorate([
        Injectable()
    ], UrlService);
    return UrlService;
}());
export { UrlService };
//# sourceMappingURL=url.service.js.map