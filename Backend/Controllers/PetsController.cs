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
        _context.Pets.Add(new Pet() { Id = 1, Name = "Spot", Description = "Was wearing a blue collared shirt", Status = "lost" OwnerId = 1});
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

    //POST api/values
    [HttpPost]
    public Pet Post ([FromBody] Pet s)
    {
      s.Id = _context.Pets.Count()+1;
      _context.Pets.Add(s);
      _context.SaveChanges(); 
      return s;
    }

    //PUT api/values/4
    [HttpPut ("{id}")]
    public Pet Put (int id, [FromBody] Pet pet)
    {
      foreach(Pet s in _context.Pets)
      {
        if(s.Id == id)
        {
          _context.Pets.Remove(s);
          _context.SaveChanges();
          _context.Pets.Add(pet);
          _context.SaveChanges(); 
          return pet;
        }
      }
      return null; 
    }

    //DELETE api/values/5
    [HttpDelete("{id}")]
    public string Delete(int id)
    {
      foreach (Pet s in _context.Pets)
      {
        if (s.Id == id)
        {
          _context.Pets.Remove(s);
          _context.SaveChanges();
          return "deleted";
        }
      }
      return "not found";
    }
  }
}