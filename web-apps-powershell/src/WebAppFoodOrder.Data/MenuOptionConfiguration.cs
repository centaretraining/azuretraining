using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAppFoodOrder.Services.Models;

namespace WebAppFoodOrder.Data
{
    public class MenuOptionConfiguration : IEntityTypeConfiguration<MenuOption>
    {
        public void Configure(EntityTypeBuilder<MenuOption> builder)
        {
            builder.ToTable("MenuOption", "dbo");
            builder.HasKey(e => e.Id);
        }
    }
}