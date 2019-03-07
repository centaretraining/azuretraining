import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MenuService } from 'src/services/menu.service';
import { Router, ActivatedRoute } from '@angular/router';
var EditMenuOptionComponent = /** @class */ (function () {
    function EditMenuOptionComponent(menuService, route, router) {
        this.menuService = menuService;
        this.route = route;
        this.router = router;
    }
    EditMenuOptionComponent.prototype.ngOnInit = function () {
        var menuOption = this.route.snapshot.data.menuOption;
        if (menuOption && menuOption.id) {
            this.id = menuOption.id;
        }
        this.nameFormControl = new FormControl(menuOption && menuOption.name ? menuOption.name : '', Validators.required);
        this.priceFormControl = new FormControl(menuOption && menuOption.price ? menuOption.price : '', Validators.compose([
            Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)
        ]));
        this.form = new FormGroup({
            menuOption: new FormGroup({
                name: this.nameFormControl,
                price: this.priceFormControl,
                description: new FormControl(menuOption && menuOption.description ? menuOption.description : '')
            })
        });
    };
    EditMenuOptionComponent.prototype.onSubmit = function () {
        var _this = this;
        var menuOptionFormGroup = this.form.get('menuOption');
        var menuOption = menuOptionFormGroup.value;
        if (this.id) {
            menuOption.id = this.id;
        }
        this.menuService.saveMenuOption(menuOption).subscribe(function (data) {
            _this.router.navigate(['/']);
        });
    };
    EditMenuOptionComponent = tslib_1.__decorate([
        Component({
            templateUrl: 'edit-menu-option.component.html',
            styleUrls: ['edit-menu-option.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [MenuService, ActivatedRoute, Router])
    ], EditMenuOptionComponent);
    return EditMenuOptionComponent;
}());
export { EditMenuOptionComponent };
//# sourceMappingURL=edit-menu-option.component.js.map