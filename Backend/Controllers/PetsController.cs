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
        _context.Pets.Add(new Pet() { Id = 1, Name = "Mia", Image = "https://78.media.tumblr.com/1d08a09f69431b09a3b2dd4d289d85c7/tumblr_inline_osz6svtpIX1qgp297_540.jpg", LastKnownLoc = "Newport Beach, CA", Status = "lost", LostSince = "April 1, 2017", Description = "Brown and white, was last seen wearing glasses, loves to eat carrots", OwnerId = 1});
        _context.Pets.Add(new Pet() { Id = 2, Name = "Bobo", Image = "https://www.vetwest.com.au/sites/default/files/styles/large/public/images/article/breed-beagle.jpg", LastKnownLoc = "Santa Ana, CA", Status = "lost", LostSince = "May 30, 2017", Description = "Beagle hound, brown and white, very friendly", OwnerId = 1});
        _context.Pets.Add(new Pet() { Id = 3, Name = "Buddy", Image = "https://cdn.shopify.com/s/files/1/0287/8140/products/2015_12-Fritz_Weekend_1024x1024.jpg?v=1477243647", LastKnownLoc = "Westminster, CA", Status = "lost", LostSince = "January 23, 2018", Description = "Brown stripes, wearing a denim blue and white polka dotted collar bow", OwnerId = 1 });     
        _context.Pets.Add(new Pet() { Id = 4, Name = "Luna", Image = "http://ww1.hdnux.com/photos/67/00/47/14420420/3/920x920.jpg", LastKnownLoc = "Irvine, CA", Status = "lost", LostSince = "September 12, 2016", Description = "Pure fluffy white with black collar tag, please reach out with information on tag", OwnerId = 1});
        _context.Pets.Add(new Pet() { Id = 5, Name = "Sadie", Image = "https://cdn.thinglink.me/api/image/767377576548106240/1240/10/scaletowidth", LastKnownLoc = "Laguna Hills, CA", Status = "lost", LostSince = "October 31, 2017", Description = "Unicorn cat with the colors of the rainbow", OwnerId = 1 });
        _context.Pets.Add(new Pet() { Id = 6, Name = "Rocky", Image = "https://www.what-dog.net/Images/faces2/scroll006.jpg", LastKnownLoc = "Riverside, CA", Status = "lost", LostSince = "June 21, 2017", Description = "Brown and white, fluffy", OwnerId = 1});
        _context.Pets.Add(new Pet() { Id = 7, Name = "Duke", Image = "https://www.dogstrust.org.uk/sponsor/_dogs/bubba-assets/v800_bubba1.jpg", LastKnownLoc = "San Diego, CA", Status = "lost", LostSince = "November 4, 2017", Description = "Wearing black and yellow collar", OwnerId = 1});
        _context.Pets.Add(new Pet() { Id = 8, Name = "Maggie", Image = "http://store.barnettharley.com/common/images/products/large/h6701-h-pbw12-1.jpg", LastKnownLoc = "Long Beach, CA", Status = "lost", LostSince = "January 25, 2018", Description = "Black and white, wearing pink collar", OwnerId = 1 });
        _context.Pets.Add(new Pet() { Id = 9, Name = "Molly", Image = "https://static.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg", LastKnownLoc = "Hacienda Height, CA", Status = "lost", LostSince = "February 27, 2017", Description = "Pure white and blue eyes", OwnerId = 1});
        _context.Pets.Add(new Pet() { Id = 10, Name = "Bailey", Image = "https://s-media-cache-ak0.pinimg.com/originals/b9/fb/03/b9fb03ae89ffe4e86fe373de2223c1f5.jpg", LastKnownLoc = "Los Angeles, CA", Status = "lost", LostSince = "January 3, 2018", Description = "Last seen wearing a yellow crown", OwnerId = 1});
        _context.Pets.Add(new Pet() { Id = 11, Name = "Jude", Image = "https://strikingattheroots.files.wordpress.com/2015/06/white-rabbit.jpg", LastKnownLoc = "Buena Park, CA", Status = "lost", LostSince = "January 4, 2018", Description = "Pure white, very nice, shy and scared", OwnerId = 1});        
        _context.Pets.Add(new Pet() { Id = 12, Name = "Tucker", Image = "https://www.dogtopia.com/santa-ana-south-coast/wp-content/uploads/sites/110/2016/01/dog-sit-homepage1.png", LastKnownLoc = "Cypress, CA", Status = "lost", LostSince = "January 8, 2018", Description = "Black and white spotty like from 101 Dalmatians", OwnerId = 1});
        _context.Pets.Add(new Pet() { Id = 13, Name = "Oliver", Image = "https://images-na.ssl-images-amazon.com/images/I/7197fUWmHgL._SL1500_.jpg", LastKnownLoc = "Anaheim, CA", Status = "lost", LostSince = "January 15, 2018", Description = "White and gray with hazel eyes, wearing red collar with gold bells", OwnerId = 1 });
        _context.Pets.Add(new Pet() { Id = 14, Name = "Charlie", Image = "http://dognamesearch.com/wp-content/uploads/2014/05/puppy-sound-300x289.jpg", LastKnownLoc = "Seal Beach, CA", Status = "lost", LostSince = "January 1, 2018", Description = "Brown, cool guy, was wearing earphones", OwnerId = 1});
        _context.Pets.Add(new Pet() { Id = 15, Name = "Bella", Image = "https://www.dabneydriveanimalhospital.com/wp-content/uploads/2011/02/63324259.jpg", LastKnownLoc = "Huntington Beach, CA", Status = "lost", LostSince = "December 24, 2017", Description = "Pure white with dark brown left ears", OwnerId = 1});
        _context.Pets.Add(new Pet() { Id = 16, Name = "Bear", Image = "https://static1.squarespace.com/static/5926393e37c581e161930ba0/t/592644ace58c62c9eacf7a73/1495680243028/Raw+Diet+k9?format=300w", LastKnownLoc = "Garden Grove, CA", Status = "lost", LostSince = "January 19, 2018", Description = "Super pure white and fluffy, wearing red and black collar", OwnerId = 1});
        _context.Pets.Add(new Pet() { Id = 17, Name = "Lucy", Image = "http://hrschicago.com/wp-content/uploads/2012/02/1294076092_iStock_000008593092XSmall.jpg", LastKnownLoc = "Cerritos, CA", Status = "lost", LostSince = "January 24, 2018", Description = "Light brown and white", OwnerId = 1});        

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