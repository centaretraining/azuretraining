using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using ServerlessFoodOrder.Services;
using System.Net.Http;
using ServerlessFoodOrder.Data.Models;
using Microsoft.Extensions.Configuration;
using ServerlessFoodOrder.Data;

namespace ServerlessFoodOrder.Api
{
    public static class MenuFunctionController
    {
        private static MenuService menuService;

        public static void Initialize(ExecutionContext context)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(context.FunctionAppDirectory)
                .AddJsonFile("local.settings.json", true)
                .AddEnvironmentVariables()
                .Build();

            menuService = new MenuService(config);
        }

        [FunctionName("GetMenuOptions")]
        public static async Task<IActionResult> GetMenuOptions(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "menu")] HttpRequest req,
            ILogger log, ExecutionContext context)
        {
            Initialize(context);
            return new OkObjectResult(JsonConvert.SerializeObject(await menuService.GetMenuOptions(), Formatting.Indented));
        }

        [FunctionName("GetMenuOption")]
        public static async Task<IActionResult> GetMenuOption(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "menu/option/{id}")] HttpRequest req,
            string id,
            ILogger log, ExecutionContext context)
        {
            Initialize(context);
            return new OkObjectResult(JsonConvert.SerializeObject(await menuService.GetMenuOption(id), Formatting.Indented));
        }

        [FunctionName("UpdateMenuOption")]
        public static async Task<IActionResult> UpdateMenuOption(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "menu/option")] HttpRequestMessage req,
            ILogger log, ExecutionContext context)
        {
            Initialize(context);
            var menuOption = await req.Content.ReadAsAsync<MenuOption>();
            var result = await menuService.SaveMenuOption(menuOption);
            return new OkObjectResult(JsonConvert.SerializeObject(result, Formatting.Indented));
        }
    }
}
