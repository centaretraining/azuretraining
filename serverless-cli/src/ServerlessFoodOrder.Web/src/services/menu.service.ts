import { Injectable } from '@angular/core';
import { MenuOption } from 'src/models/menu-option';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';

@Injectable()
export class MenuService {

    constructor(private http: HttpClient, private url: UrlService) { }

    getMenuOptions(): Observable<MenuOption[]> {
        return this.http.get<MenuOption[]>(this.url.buildUrl('/menu'));
    }

    getMenuOption(id: string): Observable<MenuOption> {
        return this.http.get<MenuOption>(this.url.buildUrl(`/menu/option/${id}`));
    }

    saveMenuOption(option: MenuOption): Observable<MenuOption> {
        return this.http.post<MenuOption>(this.url.buildUrl('/menu/option'), option);
    }
}
