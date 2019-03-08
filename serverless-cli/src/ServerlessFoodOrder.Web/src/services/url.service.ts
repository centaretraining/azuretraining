import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Url from 'url-parse';
import * as queryString from 'querystring';

@Injectable()
export class UrlService {
    buildUrl(path: string, queryParams?: any): string {
        const url = new Url(environment.apiDomain);
        if (!path.startsWith('/')) {
            path = `/${path}`;
        }
        url.set('pathname', `${environment.baseApiPath}${path}`);

        if (queryParams) {
            url.set('query', queryString.stringify(queryParams));
        }

        return url.toString();
    }
}
