using WebAppFoodOrder.Services;
using WebAppFoodOrder.Services.Models;

namespace WebAppFoodOrder.Data
{
    public class OrderRepository : Repository<Order>, IOrderRepository
    {
        public OrderRepository(MenuDbContext dbContext) : base(dbContext)
        {
        }
    }
}