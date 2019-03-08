using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServerlessFoodOrder.Data.Models
{
    public class Order
    {
        [JsonProperty(PropertyName = "id")]
        public string Id;

        [JsonProperty(PropertyName = "name")]
        public string Name;

        [JsonProperty(PropertyName = "orderItems")]
        public OrderItem[] OrderItems;

        [JsonProperty(PropertyName = "completedTime")]
        public string CompletedTime;
    }
}
