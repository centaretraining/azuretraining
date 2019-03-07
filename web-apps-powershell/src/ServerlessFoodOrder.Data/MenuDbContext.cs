using Microsoft.EntityFrameworkCore;

namespace WebAppFoodOrder.Data
{
    public class MenuDbContext : DbContext
    {
        public MenuDbContext(DbContextOptions<MenuDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new MenuOptionConfiguration());
        }
    }
}
