namespace WebAppFoodOrder.Services.Events
{
    public class OrderPlacedEvent
    {
        public string OrderId { get; set; }

        public string Name { get; set; }

        public OrderPlacedItem[] OrderItems { get; set; }
    }
}
