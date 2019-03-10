using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAppFoodOrder.Services.Models;

namespace WebAppFoodOrder.Services
{
    public class MenuService
    {
        private readonly IMenuOptionRepository _repository;

        public MenuService(IMenuOptionRepository repository)
        {
            _repository = repository;
        }


        public async Task<IEnumerable<MenuOption>> GetMenuOptions(string filter = null)
        {
            var menuOptions = await _repository.GetAll(filter);

            return menuOptions;
        }

        public async Task<MenuOption> GetMenuOption(string id)
        {
            var menuOption = await _repository.GetById(id);

            return menuOption;
        }

        public async Task SaveMenuOption(MenuOption option)
        {
            if (string.IsNullOrEmpty(option.Id))
            {
                await _repository.Add(option);
            }
            else
            {
                await _repository.Update(option);
            }
        }
    }
}
