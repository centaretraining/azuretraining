using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServerlessFoodOrder.Data.Models
{
    public class OrderItem
    {
        [JsonProperty(PropertyName = "menuOption")]
        public MenuOption MenuOption;

        [JsonProperty(PropertyName = "quantity")]
        public int Quantity;
    }
}
