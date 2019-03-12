using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using ServerlessFoodOrder.Services;
using ServerlessFoodOrder.Data.Models;
using System.Net.Http;
using Microsoft.Extensions.Configuration;
using ServerlessFoodOrder.Data;

namespace ServerlessFoodOrder.Api
{
    public static class OrderFunctionController
    {
        private static OrderService orderService;

        public static void Initialize(ExecutionContext context)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(context.FunctionAppDirectory)
                .AddJsonFile("local.settings.json", true)
                .AddEnvironmentVariables()
                .Build();

            orderService = new OrderService(config, new AzureServiceBus(config));
        }

        [FunctionName("GetActiveOrders")]
        public static async Task<IActionResult> GetActiveOrders(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "order")] HttpRequest req,
            ILogger log, ExecutionContext context)
        {
            Initialize(context);
            return new OkObjectResult(JsonConvert.SerializeObject(await orderService.GetActiveOrders(), Formatting.Indented));
        }

        [FunctionName("GetCompletedOrders")]
        public static async Task<IActionResult> GetCompletedOrders(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route ="order/complete")] HttpRequest req,
            ILogger log, ExecutionContext context)
        {
            Initialize(context);
            return new OkObjectResult(JsonConvert.SerializeObject(await orderService.GetCompletedOrders(), Formatting.Indented));
        }

        [FunctionName("CompleteOrder")]
        public static async Task<IActionResult> CompleteOrder(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "order/{id}/complete")] HttpRequest req,
            string id,
            ILogger log, ExecutionContext context)
        {
            Initialize(context);
            return new OkObjectResult(JsonConvert.SerializeObject(await orderService.CompleteOrder(id), Formatting.Indented));
        }

        [FunctionName("SaveOrder")]
        public static async Task<IActionResult> SaveOrder(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "order")] HttpRequestMessage req,
            ILogger log, ExecutionContext context)
        {
            Initialize(context);
            var order = await req.Content.ReadAsAsync<Order>();
            var result = await orderService.SaveOrder(order);
        return new OkObjectResult(JsonConvert.SerializeObject(result, Formatting.Indented));
        }
    }
}
