using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Controllers;
using Microsoft.EntityFrameworkCore;

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