using System.Collections.ObjectModel;

namespace WebAppFoodOrder.Services.Models
{
    public class Order
    {
        public Order()
        {
            OrderItems = new Collection<OrderItem>();
        }

        public string Id { get; set; }

        public string Name { get; set; }

        public Collection<OrderItem> OrderItems { get; set; }

        public string CompletedTime { get; set; }
    }
}
