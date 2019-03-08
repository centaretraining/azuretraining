import { Injectable, EventEmitter } from '@angular/core';
import { MenuOption } from 'src/models/menu-option';
import { OrderItem } from 'src/models/order-item';
import { MenuService } from './menu.service';
import { tap, map, catchError } from 'rxjs/operators';
import { OrderService } from './order.service';
import { Observable, of } from 'rxjs';
import { Order } from 'src/models/order';

const SESSION_STORAGE_KEY = 'cart';

@Injectable()
export class CartService {

    cartChanged = new EventEmitter<Order>();

    constructor(private orderService: OrderService) { }

    getCart(): Order {
        let cart: Order = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY));
        if (!cart) {
            cart = { orderItems: [] };
        }

        return cart;
    }

    addToCart(menuOption: MenuOption, quantity: number): void {
        const cart: Order = this.getCart();

        const foundIndex = cart.orderItems.findIndex(order => order.menuOption.id === menuOption.id);

        if (foundIndex > -1) {
            cart.orderItems[foundIndex].quantity += quantity;
        } else {
            cart.orderItems.push({
                menuOption,
                quantity
            });
        }

        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(cart));

        this.cartChanged.emit(cart);
    }

    setName(name: string): void {
        const cart: Order = this.getCart();
        cart.name = name;
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(cart));
    }

    clearCart(): void {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
        this.cartChanged.emit();
    }

    submitCart(): Observable<boolean> {
        const order = this.getCart();
        return this.orderService.submitOrder(order)
            .pipe(
                map(() => {
                    this.clearCart();
                    return true;
                }),
                catchError((error) => {
                    console.error('There was an error submitting the order');
                    console.error(error);
                    return of(false);
                })
            );
    }
}
