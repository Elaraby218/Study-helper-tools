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

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) 
        { 
            optionsBuilder.UseSqlite("Data Source=Database\\StudyHelperTools.db"); 
        }
        public DbSet<ToDo> ToDos { get; set; }
        public DbSet<User> Users { get; set; }

    }
}
