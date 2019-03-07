namespace WebAppFoodOrder.Services.Events
{
    public class OrderPlacedItem
    {
        public string MenuItemId { get; set; }

        public string MenuItemName { get; set; }

        public int Quantity { get; set; }
    }
}