using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAppFoodOrder.Services;
using WebAppFoodOrder.Services.Models;

namespace WebAppFoodOrder.Data
{
    public class Repository<T> : IRepository<T>
        where T : class
    {
        public Repository(DbContext dbContext)
        {
            DbContext = dbContext;
        }

        public DbContext DbContext { get; }

        public Task<T> GetById(string id)
        {
            return DbContext.Set<T>().FindAsync(id);
        }

        public async Task<IEnumerable<T>> GetAll(string filter = null)
        {
            if (!string.IsNullOrWhiteSpace(filter) && typeof(T) == typeof(MenuOption))
            {
                // Totally not a SQL injection vulnerability...
                var sql = "SELECT * FROM menu.MenuOption WHERE Name LIKE '%" + filter + "%'";
                return await DbContext.Set<T>().FromSql(sql).ToListAsync();
            }
            else
            {
                return await DbContext.Set<T>().ToListAsync();
            }
        }

        public virtual async Task<IEnumerable<T>> Get(Expression<Func<T, bool>> predicate)
        {
            return await DbContext.Set<T>().Where(predicate).ToListAsync();
        }

        public async Task Add(T item)
        {
            DbContext.Set<T>().Attach(item);
            await DbContext.SaveChangesAsync();
        }

        public async Task Update(T item)
        {
            DbContext.Set<T>().Update(item);
            await DbContext.SaveChangesAsync();
        }

        public async Task Delete(string id)
        {
            var item = await DbContext.Set<T>().FindAsync(id);
            if (item != null)
            {
                DbContext.Set<T>().Remove(item);
                await DbContext.SaveChangesAsync();
            }
        }
    }
}
