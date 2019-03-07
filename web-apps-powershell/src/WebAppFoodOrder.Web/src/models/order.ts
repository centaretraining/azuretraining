import { OrderItem } from './order-item';

export interface Order {
    id?: string;
    name?: string;
    orderItems: OrderItem[];
    completedTime?: string;
}
