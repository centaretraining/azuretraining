using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAppFoodOrder.Services;
using WebAppFoodOrder.Services.Models;

namespace WebAppFoodOrder.Data
{
    public class OrderRepository : Repository<Order>, IOrderRepository
    {
        public OrderRepository(MenuDbContext dbContext) : base(dbContext)
        {
        }

        public override async Task<IEnumerable<Order>> Get(Expression<Func<Order, bool>> predicate)
        {
            return await DbContext.Set<Order>()
                .Include(e => e.OrderItems)
                .ThenInclude(e => e.MenuOption)
                .Where(predicate)
                .ToListAsync();
        }
    }
}