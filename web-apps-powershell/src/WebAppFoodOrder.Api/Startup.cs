﻿using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WebAppFoodOrder.Data;
using WebAppFoodOrder.Services;

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
            services.AddScoped<IMenuOptionRepository, MenuOptionRepository>();
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<MenuService>();
            services.AddScoped<OrderService>();
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
                var orderContext = serviceScope.ServiceProvider.GetRequiredService<OrderDbContext>();
                orderContext.Database.EnsureCreated();
                var menuContext = serviceScope.ServiceProvider.GetRequiredService<MenuDbContext>();
                menuContext.Database.EnsureCreated();
            }
        }
    }
}