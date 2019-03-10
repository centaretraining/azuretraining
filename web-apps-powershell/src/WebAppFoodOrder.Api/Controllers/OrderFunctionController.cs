using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAppFoodOrder.Services;
using WebAppFoodOrder.Services.Models;

namespace WebAppFoodOrder.Api.Controllers
{
    [Route("api")]
    public class OrderFunctionController
    {
        private static OrderService _orderService;

        public OrderFunctionController(OrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet("order")]
        public async Task<IActionResult> GetActiveOrders()
        {
            var result = await _orderService.GetActiveOrders();
            return new OkObjectResult(result);
        }

        [HttpGet("order/complete")]
        public async Task<IActionResult> GetCompletedOrders()
        {
            var result = await _orderService.GetCompletedOrders();
            return new OkObjectResult(result);
        }

        [HttpPost("order/{id}/complete")]
        public async Task<IActionResult> CompleteOrder(string id)
        {
            await _orderService.CompleteOrder(id);
            return new OkResult();
        }

        [HttpPost("order")]
        public async Task<IActionResult> SaveOrder(Order order)
        {
            Order result;
            if (order.OrderItems == null)
            {
                result = await _orderService.SaveRandomOrder(order.Name);
            }
            else
            {
                result = await _orderService.SaveOrder(order);
            }
            return new OkObjectResult(result);
        }
    }
}
