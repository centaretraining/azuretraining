using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using ServerlessFoodOrder.Data;
using ServerlessFoodOrder.Data.Models;
using Microsoft.Azure.Documents;
using Microsoft.Extensions.Configuration;

namespace ServerlessFoodOrder.Services
{
    public class MenuService
    {
        private DataRepository<MenuOption> repo;

        public MenuService(IConfigurationRoot config)
        {
            this.repo = new DataRepository<MenuOption>(config);
        }


        public async Task<List<MenuOption>> GetMenuOptions()
        {
            var menuOptions = (await this.repo.GetItemsAsync(x => x.Id != null)).ToList();

            return menuOptions;
        }

        public async Task<MenuOption> GetMenuOption(string id)
        {
            var menuOption = await this.repo.GetItemAsync(id);

            return menuOption;
        }

        public async Task<Document> SaveMenuOption(MenuOption option)
        {
            
            if (String.IsNullOrEmpty(option.Id))
            {
                return await this.repo.CreateItemAsync(option);
            }
            
            return await this.repo.UpdateItemAsync(option.Id, option);
        }
    }
}
