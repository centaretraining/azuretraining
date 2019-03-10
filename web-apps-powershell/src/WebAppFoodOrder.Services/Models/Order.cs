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

        public string CreditCardNumber { get; set; }

        public string CreditCardExpirationDate { get; set; }

        public string CreditCardCvv { get; set; }

        public string Address1 { get; set; }

        public string Address2 { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string Zip { get; set; }
    }
}
