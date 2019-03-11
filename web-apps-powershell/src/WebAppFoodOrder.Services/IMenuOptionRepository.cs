using System.Collections.Generic;
using System.Threading.Tasks;
using WebAppFoodOrder.Services.Models;

namespace WebAppFoodOrder.Services
{
    public interface IMenuOptionRepository : IRepository<MenuOption>
    {
        Task<IEnumerable<MenuOption>> GetByIds(string[] ids);
    }
}