using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Backend.Controllers
{
  [Route("api/pets")]
  public class PetsController : Controller
  {
    private readonly SpotAlertContext _context;
    public PetsController(SpotAlertContext context)
    {
      _context = context;

      if (_context.Pets.Count() == 0)
      {
        _context.Pets.Add(new Pet() { Id = 1, Name = "Spot", Address = "2850 Redhill Ave.", PhoneNumber = "1234567890", Description = "Was wearing a blue collared shirt", OwnerId = 1});

        _context.SaveChanges();
      }
    }

    // GET api/pets
    [HttpGet]
    public List<Pet> Get()
    {
      return _context.Pets.ToList();
    }

    // GET api/users/5
    [HttpGet("{id}")]
    public Pet Get(int id)
    {
      foreach (Pet t in _context.Pets)
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