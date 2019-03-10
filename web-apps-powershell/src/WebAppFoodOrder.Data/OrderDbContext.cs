using System.Data.SqlClient;
using Microsoft.Azure.Services.AppAuthentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace WebAppFoodOrder.Data
{
    public class OrderDbContext : DbContext
    {
        public OrderDbContext(
            DbContextOptions<MenuDbContext> options,
            IConfiguration configuration) : base(options)
        {
            if (configuration["EnableManagedServiceIdentity"]?.ToLower() == "true")
            {
                var conn = (SqlConnection)Database.GetDbConnection();
                conn.AccessToken = (new AzureServiceTokenProvider())
                    .GetAccessTokenAsync("https://database.windows.net/").Result;
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new OrderConfiguration());
            modelBuilder.ApplyConfiguration(new OrderItemConfiguration());
        }
    }
}