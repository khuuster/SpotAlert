using System;
using Microsoft.EntityFrameworkCore;
using User.Controllers;
using Pet.Controllers;

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