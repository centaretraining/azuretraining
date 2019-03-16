using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAppFoodOrder.Services.Models;

namespace WebAppFoodOrder.Data
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.ToTable("Order", "order");
            builder.HasKey(e => e.Id);
            builder.HasMany(e => e.OrderItems).WithOne();
        }
    }
}