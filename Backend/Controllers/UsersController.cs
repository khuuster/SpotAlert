using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Backend.Controllers
{
  [Route("api/users")]
  public class UsersController : Controller
  {
    private readonly SpotAlertContext _context;
    public UsersController(SpotAlertContext context)
    {
      _context = context;

      if (_context.Users.Count() == 0)
      {
        _context.Users.Add(new User() { Id = 1, FirstName = "Bobby", LastName="Lee", Email="bobby@gmail.com", Password = "1234", PhoneNumber = "1234567890", Address = "2850 Redhill Ave."});

        _context.SaveChanges();
      }
    }


    // GET api/users
    [HttpGet]
    public List<User> Get()
    {
      return _context.Users.ToList();
    }

    // GET api/users/5
    [HttpGet("{id}")]
    public User Get(int id)
    {
      foreach (User t in _context.Users)
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

