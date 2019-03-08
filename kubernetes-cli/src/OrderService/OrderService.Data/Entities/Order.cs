using System;
using System.Collections.Generic;

namespace OrderService.Data
{

    public enum OrderStatus {
        New, 
        InProcess, 
        Completed, 
        Cancelled
    }

    public enum PaymentType {
        None,
        Cash, 
        CreditCard,
        GiftCertificate
    }
    
    public class Order
    {
        public long Id { get; set; }

        public long CustomerId { get; set; }

        public DateTime Created { get; set; }

        public OrderStatus Status { get; set; }
        
        public PaymentType Payment { get; set; }

        public List<OrderItem> Items { get; set; }
    }
}
