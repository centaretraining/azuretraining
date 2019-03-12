using System;
using System.Collections.Generic;
using System.Text;

namespace ServerlessFoodOrder.Data.Models
{
    public class OrderPlacedItem
    {
        public string MenuItemId { get; set; }

        public string MenuItemName { get; set; }

        public int Quantity { get; set; }
    }
}
