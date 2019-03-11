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
        private readonly IOrderRepository _orderRepository;
        private readonly IMenuOptionRepository _menuOptionRepository;
        private readonly MenuService _menuService;
        private readonly IServiceBus _serviceBus;

        public OrderService(
            IOrderRepository orderRepository,
            IMenuOptionRepository menuOptionRepository,
            MenuService menuService, 
            IServiceBus serviceBus)
        {
            _orderRepository = orderRepository;
            _menuOptionRepository = menuOptionRepository;
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

        public async Task<Order> SaveRandomOrder(string name)
        {
            var items = (await _menuService.GetMenuOptions()).ToList();
            if (items.Count() > 0)
            {
                var order = new Order()
                {
                    CompletedTime = DateTime.Now.ToString(),
                    Name = name
                };

                var item = items.Skip(new Random().Next(0, items.Count() - 1)).First();
                order.OrderItems.Add(new OrderItem()
                {
                    MenuOptionId = item.Id,
                    Quantity = 1
                });

                await SaveOrder(order);

                return order;
            }

            return null;
        }

        public async Task<Order> SaveOrder(Order order)
        {
            if (string.IsNullOrEmpty(order.Id))
            {
                await _orderRepository.Add(order);

                var items = await _menuOptionRepository.GetByIds(
                    order.OrderItems.Select(i => i.MenuOptionId).ToArray());

                var message = new OrderPlacedEvent()
                {
                    Name = order.Name,
                    OrderId = order.Id,
                    OrderItems = order.OrderItems
                        .Select(i => new OrderPlacedItem()
                        {
                            MenuItemId = i.Id.ToString(),
                            MenuItemName = items.FirstOrDefault(m => m.Id == i.MenuOptionId)?.Name,
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
