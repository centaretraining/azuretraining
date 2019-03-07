import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MenuOption } from 'src/models/menu-option';
import { MenuService } from 'src/services/menu.service';

@Injectable()
export class MenuOptionResolver implements Resolve<Observable<MenuOption>> {
    constructor(private menuService: MenuService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<MenuOption> | Observable<Observable<MenuOption>> | Promise<Observable<MenuOption>> {

            const id = route.params.id;
            if (id && id !== null) {
                return this.menuService.getMenuOption(id);
            }
            return of(null);
    }

}
