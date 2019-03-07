import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from 'src/models/order';
import { OrderService } from 'src/services/order.service';

@Injectable()
export class CompletedOrdersResolver implements Resolve<Observable<Order[]>> {
    constructor(private orderService: OrderService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<Order[]> | Observable<Observable<Order[]>> | Promise<Observable<Order[]>> {
            return this.orderService.getCompletedOrders();
    }

}
