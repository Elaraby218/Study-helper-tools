using Microsoft.EntityFrameworkCore;
using Study_helper_tools.Models;
namespace Study_helper_tools.Database
{
    public class appDbContext : DbContext
    {
        public appDbContext(DbContextOptions<appDbContext> options) : base(options)
        {
        }
        public appDbContext() { }

        public DbSet<ToDo> ToDos { get; set; }
        public DbSet<User> Users { get; set; }

    }
}
