using System;
using System.Collections.Generic;
using System.Text;

namespace ServerlessFoodOrder.Data.Models
{
    public class OrderPlacedEvent
    {
        public string OrderId { get; set; }

        public string Name { get; set; }

        public OrderPlacedItem[] OrderItems { get; set; }
    }
}
