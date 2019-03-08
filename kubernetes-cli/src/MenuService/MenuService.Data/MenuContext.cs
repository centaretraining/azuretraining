using MenuService.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace MenuService.Data
{
    public class MenuContext: DbContext
    {
        public MenuContext(DbContextOptions<MenuContext> options): base(options)
        { }

        public DbSet<Menu> Menu { get; set; }
        public DbSet<MenuItem> MenuItem { get; set; }
    }
}
