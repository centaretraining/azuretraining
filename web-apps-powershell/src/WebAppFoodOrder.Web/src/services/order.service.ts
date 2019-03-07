import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { OrderItem } from 'src/models/order-item';
import { UrlService } from './url.service';
import { Order } from 'src/models/order';

@Injectable()
export class OrderService {
    constructor(private http: HttpClient, private url: UrlService)  { }

    completeOrder(id: string): Observable<Order> {
        return this.http.post<Order>(this.url.buildUrl(`/order/${id}/complete`), null);
    }

    submitOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(this.url.buildUrl('/order'), order);
    }

    getActiveOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.url.buildUrl('/order'));
    }

    getCompletedOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.url.buildUrl('/order/complete'));
    }

    getCost(order: Order): number {
        let cost = 0;

        if (!order || !order.orderItems || order.orderItems.length <= 0) {
            return cost;
        }
        order.orderItems.forEach(orderItem => {
            cost += orderItem.menuOption.price * orderItem.quantity;
        });

        return cost;
    }
}
