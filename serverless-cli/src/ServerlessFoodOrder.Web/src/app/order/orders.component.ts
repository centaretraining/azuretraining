import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/models/order';
import { OrderService } from 'src/services/order.service';
import { take, switchMap, map, flatMap } from 'rxjs/operators';
import { concat } from 'rxjs';

@Component({
    templateUrl: 'orders.component.html',
    styleUrls: ['orders.component.scss']
})
export class OrdersComponent implements OnInit {
    orders: Order[];
    completedOrders: Order[];

    constructor(private route: ActivatedRoute, private orderService: OrderService) { }

    ngOnInit(): void {
        this.orders = this.route.snapshot.data.orders;
        this.completedOrders = this.route.snapshot.data.completedOrders;
    }

    completeOrder(id: string): void {
        this.orderService.completeOrder(id)
            .pipe(
                take(1),
                flatMap(() => this.orderService.getActiveOrders()),
                map((newOrders) => { this.orders = newOrders; }),
                flatMap(() => this.orderService.getCompletedOrders()),
                map((compltedOrders) => { this.completedOrders = compltedOrders; })
            ).subscribe();
    }

    getCost(order: Order): number {
        return this.orderService.getCost(order);
    }
}
