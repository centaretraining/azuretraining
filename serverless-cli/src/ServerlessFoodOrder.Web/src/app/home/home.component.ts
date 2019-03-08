import { Component, OnInit } from '@angular/core';
import { MenuOption } from 'src/models/menu-option';
import { MenuService } from 'src/services/menu.service';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {
    menuOptions: MenuOption[];

    constructor(private menuService: MenuService) { }

    ngOnInit() {
        this.menuService.getMenuOptions().subscribe((data) => {
            this.menuOptions = data;
        });
    }
}
