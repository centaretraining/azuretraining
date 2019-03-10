using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAppFoodOrder.Services;
using WebAppFoodOrder.Services.Models;

namespace WebAppFoodOrder.Api.Controllers
{
    [Route("api")]
    public class MenuFunctionController
    {
        private readonly MenuService _menuService;

        public MenuFunctionController(MenuService menuService)
        {
            _menuService = menuService;
        }

        [HttpGet("menu")]
        public async Task<IActionResult> GetMenuOptions(string filter)
        {
            var result = await _menuService.GetMenuOptions(filter);
            return new OkObjectResult(result);
        }

        [HttpGet("menu/option/{id}")]
        public async Task<IActionResult> GetMenuOption(string id)
        {
            var result = await _menuService.GetMenuOption(id);
            return new OkObjectResult(result);
        }

        [HttpPost("menu/option")]
        public async Task<IActionResult> UpdateMenuOption(MenuOption menuOption)
        {
            await _menuService.SaveMenuOption(menuOption);
            return new OkObjectResult(menuOption);
        }
    }
}
