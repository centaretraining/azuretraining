using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppFoodOrder.Services.Events;
using WebAppFoodOrder.Services.Models;

namespace WebAppFoodOrder.Services
{
    public class OrderService
    {
        private IOrderRepository _orderRepository;
        private MenuService _menuService;
        private IServiceBus _serviceBus;

        public OrderService(
            IOrderRepository orderRepository,
            MenuService menuService, 
            IServiceBus serviceBus)
        {
            _orderRepository = orderRepository;
            _menuService = menuService;
            _serviceBus = serviceBus;
        }

        public async Task<IEnumerable<Order>> GetActiveOrders()
        {
            return await _orderRepository.Get(x => x.CompletedTime == null);
        }

        public async Task<IEnumerable<Order>> GetCompletedOrders()
        {
            return await _orderRepository.Get(x => x.CompletedTime != null);
        }

        public async Task<Order> SaveOrder(Order order)
        {
            if (string.IsNullOrEmpty(order.Id))
            {
                await _orderRepository.Add(order);

                var message = new OrderPlacedEvent()
                {
                    Name = order.Name,
                    OrderId = order.Id,
                    OrderItems = order.OrderItems
                        .Select(i => new OrderPlacedItem()
                        {
                            MenuItemId = i.Id.ToString(),
                            MenuItemName = i.MenuOption.Name,
                            Quantity = i.Quantity
                        })
                        .ToArray()
                };
                await _serviceBus.PublishAsync(message);
            }
            else
            {
                await _orderRepository.Update(order);
            }

            return order;
        }

        public async Task CompleteOrder(string id)
        {
            var order = await _orderRepository.GetById(id);
            order.CompletedTime = DateTime.UtcNow.ToString("o");
            await SaveOrder(order);
        }
    }
}
