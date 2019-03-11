using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAppFoodOrder.Services;
using WebAppFoodOrder.Services.Models;

namespace WebAppFoodOrder.Data
{
    public class MenuOptionRepository : Repository<MenuOption>, IMenuOptionRepository
    {
        public MenuOptionRepository(MenuDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<IEnumerable<MenuOption>> GetByIds(string[] ids)
        {
            return await DbContext.Set<MenuOption>()
                .Where(i => ids.Contains(i.Id))
                .ToListAsync();
        }
    }
}