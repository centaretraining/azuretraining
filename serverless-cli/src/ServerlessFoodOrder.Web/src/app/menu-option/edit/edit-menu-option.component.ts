import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MenuService } from 'src/services/menu.service';
import { MenuOption } from 'src/models/menu-option';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: 'edit-menu-option.component.html',
    styleUrls: ['edit-menu-option.component.scss']
})
export class EditMenuOptionComponent implements OnInit {
    id: string;
    form: FormGroup;

    nameFormControl: FormControl;
    priceFormControl: FormControl;


    constructor(private menuService: MenuService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        const menuOption = this.route.snapshot.data.menuOption;

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
    }

    onSubmit() {
        const menuOptionFormGroup = this.form.get('menuOption');
        const menuOption = menuOptionFormGroup.value as MenuOption;
        if (this.id) {
            menuOption.id = this.id;
        }

        this.menuService.saveMenuOption(menuOption).subscribe((data) => {
            this.router.navigate(['/']);
        });
    }
}
