using WebAppFoodOrder.Services;
using WebAppFoodOrder.Services.Models;

namespace WebAppFoodOrder.Data
{
    public class MenuOptionRepository : Repository<MenuOption>, IMenuOptionRepository
    {
        public MenuOptionRepository(MenuDbContext dbContext) : base(dbContext)
        {
        }
    }
}