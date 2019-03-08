import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { OrderItem } from 'src/models/order-item';
import { take } from 'rxjs/operators';
import { Order } from 'src/models/order';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from 'src/services/order.service';
import { NotifyService } from 'src/services/notify.service';

@Component({
    selector: 'app-cart',
    templateUrl: 'cart.component.html',
    styleUrls: ['cart.component.scss']
})
export class CartComponent implements OnInit {
    order: Order;
    cost: number;
    form: FormGroup;
    nameFormControl: FormControl;

    constructor(
        private cartService: CartService,
        private orderService: OrderService,
        private notifyService: NotifyService
    ) { }

    ngOnInit(): void {
        this.order = this.cartService.getCart();
        this.cost = this.orderService.getCost(this.order);

        this.cartService.cartChanged.subscribe((newOrder: Order) => {
            this.order = newOrder;
            this.cost = this.orderService.getCost(this.order);
        });

        this.nameFormControl = new FormControl(this.order.name ? this.order.name : '', Validators.required);
        this.form = new FormGroup({
            name: this.nameFormControl
        });
    }

    setName(): void {
        const name = this.nameFormControl.value;
        this.cartService.setName(name);
    }

    onSubmit(): void {
        this.cartService.submitCart().pipe(take(1)).subscribe((result) => {
            if (result) {
                this.notifyService.success('Order Successful!', `The order was submitted successfully.`);
            } else {
                this.notifyService.error('Error', 'There was an error submitting the order');
            }
        });
    }
}
