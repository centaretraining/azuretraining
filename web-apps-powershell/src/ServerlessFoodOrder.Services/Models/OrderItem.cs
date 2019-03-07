namespace WebAppFoodOrder.Services.Models
{
    public class OrderItem
    {
        public int Id { get; set; }

        public virtual MenuOption MenuOption { get; set; }

        public int Quantity { get; set; }
    }
}
