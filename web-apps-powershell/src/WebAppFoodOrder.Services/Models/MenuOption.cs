using Newtonsoft.Json;

namespace WebAppFoodOrder.Services.Models
{
    public class MenuOption
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "price")]
        public double Price { get; set; }

        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }
    }
}
