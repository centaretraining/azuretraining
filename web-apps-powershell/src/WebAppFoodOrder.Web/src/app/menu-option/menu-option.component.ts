import { Component, Input, OnInit } from '@angular/core';
import { MenuOption } from 'src/models/menu-option';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/services/cart.service';

@Component({
    selector: 'app-menu-option',
    templateUrl: 'menu-option.component.html',
    styleUrls: ['menu-option.component.scss']
})
export class MenuOptionComponent implements OnInit {
    @Input() menuOption: MenuOption;
    form: FormGroup;
    quantityFormControl: FormControl;

    constructor(private cartService: CartService) { }

    ngOnInit(): void {
        this.quantityFormControl = new FormControl(1, Validators.compose([
            Validators.required,
            Validators.pattern(/^[1-9]\d*\.?[0]*$/)
        ]));
        this.form = new FormGroup({
            quantity: this.quantityFormControl
        });
    }

    onSubmit(): void {
        this.cartService.addToCart(this.menuOption, this.quantityFormControl.value);
        this.form.reset({ quantity: 1 });
    }
}
