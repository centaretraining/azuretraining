﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WebAppFoodOrder.Data;
using WebAppFoodOrder.Services;
using WebAppFoodOrder.Services.Events;
using WebAppFoodOrder.Services.Models;

namespace WebAppFoodOrder.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            
            services.AddDbContext<MenuDbContext>(opt =>
                opt.UseSqlServer(Configuration.GetConnectionString("MenuConnection")));
            services.AddDbContext<OrderDbContext>(opt =>
                opt.UseSqlServer(Configuration.GetConnectionString("OrderConnection")));
            services.AddTransient<IMenuOptionRepository, MenuOptionRepository>();
            services.AddTransient<IOrderRepository, OrderRepository>();
            services.AddTransient<MenuService>();
            services.AddTransient<OrderService>();
            services.AddTransient<IServiceBus, AzureServiceBus>();

            InitializeDatabase(Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseCors(builder =>
            {
                builder.AllowAnyOrigin();
                builder.AllowAnyMethod();
                builder.AllowAnyHeader();
            });
            app.UseHttpsRedirection();
            app.UseMvc();

            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                                    
            }
        }

        private static void InitializeDatabase(IConfiguration configuration)
        {
            var menuOptsBuilder = new DbContextOptionsBuilder<MenuDbContext>();
            menuOptsBuilder.UseSqlServer(configuration.GetConnectionString("MenuConnection"));
            var menuContext = new MenuDbContext(menuOptsBuilder.Options, configuration);
            menuContext.Database.EnsureCreated();

            SeedDatabase(menuContext);
        }

        private static void SeedDatabase(MenuDbContext menuContext)
        {
            var menuRepo = new MenuOptionRepository(menuContext);

            menuRepo.Add(new MenuOption()
            {
                Name = "Bacon, Lettuce, and Tomato Sandwich",
                Price = 5
            }).Wait();
            menuRepo.Add(new MenuOption()
            {
                Name = "Turkey Bacon Sandwich",
                Price = 6
            }).Wait();
            menuRepo.Add(new MenuOption()
            {
                Name = "Bacon Cheeseburger",
                Price = 7
            }).Wait();
            menuRepo.Add(new MenuOption()
            {
                Name = "Small Soda",
                Price = 1.5
            }).Wait();
            menuRepo.Add(new MenuOption()
            {
                Name = "Large Soda",
                Price = 2.5
            }).Wait();
            menuRepo.Add(new MenuOption()
            {
                Name = "Fries",
                Price = 3
            }).Wait();
        }
    }
}
