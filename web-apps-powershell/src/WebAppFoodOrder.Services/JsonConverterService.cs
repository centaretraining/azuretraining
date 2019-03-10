using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace WebAppFoodOrder.Services
{
    public class JsonConverterService
    {

        public static string SerializeJsonCamelCase(object input)
        {
            var contractResolver = new DefaultContractResolver
            {
                NamingStrategy = new CamelCaseNamingStrategy()
            };

            string jsonResult = JsonConvert.SerializeObject(input, new JsonSerializerSettings
            {
                ContractResolver = contractResolver,
                Formatting = Formatting.Indented
            });

            return jsonResult;
        }
    }
}
