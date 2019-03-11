namespace WebAppFoodOrder.Services.Models
{
    public class OrderItem
    {
        public int Id { get; set; }

        public string MenuOptionId { get; set; }

        public int Quantity { get; set; }
    }
}
