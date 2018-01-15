using System;
using Microsoft.EntityFrameworkCore;
using spotalert.Controllers;

namespace spotalert
{
    public class SpotAlertContext : DbContext
    {
        public SpotAlertContext(DbContextOptions<SpotAlertContext> options) : base(options)
        {
            
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Pet> Pets { get; set; }
       
    }
}