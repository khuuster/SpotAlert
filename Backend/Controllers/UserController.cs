using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace spotalert.Controllers
{
     private readonly SpotAlertContext _context;

        public UserController(SpotAlertContext context)
        {
            _context = context;

            if (_context.Users.Count() == 0) {
                _context.Users.Add (new User ()
               {
                   Id = 1, Name = "Bobby", Password = "1234", Coin = 400, Prize1 = "Write essay instead of take test or opposite",Prize2 = "Free Homework Pass", Prize3 = "", Prize4 = "", Prize5 = ""
               });
               
            
            _context.SaveChanges();
        }

    [Route("api/users")]
    public class UserController : Controller
    {
       // GET api/students
        [HttpGet]
        public List<User> Get()
        {
            return _context.Users.ToList();
        }

        // GET api/Users/5
        [HttpGet("{id}")]
        public User Get(int id)
        {
            foreach(User t in _context.Users)
            {
                if (t.Id == id)
                {
                    return t;
                }
            }
            return null;
        }
    }
}
