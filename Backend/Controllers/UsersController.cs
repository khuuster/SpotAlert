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
        _context.Users.Add(new User() { Id = 1, FirstName = "Bobby", LastName = "Lee", Email = "bobbylee@gmail.com", Password = "1234", ConfirmPassword = "1234", PhoneNumber = "(523) 584-6058", Address = "7246 W. Windsor Dr., Carmichael, CA 95608", Message = "Hi Bobby, I found your dog. She is currently safe with me. I can tell that she is very scared and misses her home and especially her family. Please give me a call or an email as soon as possible.", MessageName = "Emma", MessageNumber = "(543) 345-8690", MessageEmail = "emma@gmail.com"});
        _context.Users.Add(new User() { Id = 2, FirstName = "Tom", LastName = "Ford", Email = "tomford@gmail.com", Password = "0000", ConfirmPassword = "0000", PhoneNumber = "(898) 457-6842", Address = "601 Sherwood Ave., San Bernardino, CA 92404"});
        _context.Users.Add(new User() { Id = 3, FirstName = "Kate", LastName = "Spade", Email = "katespade@gmail.com", Password = "1111", ConfirmPassword = "1111", PhoneNumber = "(324) 287-3247", Address = "689 Brookside St., Laguna Niguel, CA 92677"});
        _context.Users.Add(new User() { Id = 4, FirstName = "Cy", LastName = "Shiro", Email = "cyshiro@gmail.com", Password = "2222", ConfirmPassword = "2222", PhoneNumber = "(085) 258-7450", Address = "689 Brookside St., Laguna Niguel, CA 92677"});
        _context.Users.Add(new User() { Id = 5, FirstName = "Alie", LastName = "Julious", Email = "aliejulious@gmail.com", Password = "3333", ConfirmPassword = "3333", PhoneNumber = "(973) 722-5201", Address = "689 Brookside St., Laguna Niguel, CA 92677"});

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

    //POST api/values
    [HttpPost]
    public User Post([FromBody] User s)
    {
      // Only add users if all objects has values & if password value is the same as confirm password value; otherwise, user will not be added
      if (s.FirstName != null && s.FirstName != "" && s.LastName != null && s.LastName != "" && s.Email != null && s.Email != "" && s.PhoneNumber != null && s.PhoneNumber != "" && s.Password != null && s.Password != "" && s.ConfirmPassword != null && s.ConfirmPassword != "" && s.Password == s.ConfirmPassword)

      {
        s.Id = _context.Users.Count() + 1;
        _context.Users.Add(s);
        _context.SaveChanges();
        return s;
      }
      return null;
    }

    //PUT api/values/4
    [HttpPut("{id}")]
    public User Put(int id, [FromBody] User user)
    {
      foreach (User s in _context.Users)
      {
        if (s.Id == id)
        {
          _context.Users.Remove(s);
          _context.SaveChanges();
          _context.Users.Add(user);
          _context.SaveChanges();
          return user;
        }
      }
      return null;
    }

    //DELETE api/values/5
    [HttpDelete("{id}")]
    public string Delete(int id)
    {
      foreach (User s in _context.Users)
      {
        if (s.Id == id)
        {
          _context.Users.Remove(s);
          _context.SaveChanges();
          return "deleted";
        }
      }
      return "not found";
    }
  }
}

