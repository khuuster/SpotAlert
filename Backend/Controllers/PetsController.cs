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
        _context.Pets.Add(new Pet() { Id = 1, Name = "Mia", Image = "https://78.media.tumblr.com/1d08a09f69431b09a3b2dd4d289d85c7/tumblr_inline_osz6svtpIX1qgp297_540.jpg", LastKnownLoc = "315 Pacific Coast Hwy, Huntington Beach, CA 92648", Status = "lost", LostSince = "04/01/17", Description = "Brown and white, was last seen wearing glasses, loves to eat carrots", OwnerId = 1});
        _context.Pets.Add(new Pet() { Id = 2, Name = "Bobo", Image = "https://www.vetwest.com.au/sites/default/files/styles/large/public/images/article/breed-beagle.jpg", Status = "not lost", Description = "Beagle hound, brown and white, very friendly", OwnerId = 1});
        _context.Pets.Add(new Pet() { Id = 3, Name = "Buddy", Image = "https://cdn.shopify.com/s/files/1/0287/8140/products/2015_12-Fritz_Weekend_1024x1024.jpg?v=1477243647", Status = "not lost", Description = "Brown stripes, likes to wear his denim blue and white polka dotted collar bow", OwnerId = 1});     
        _context.Pets.Add(new Pet() { Id = 4, Name = "Luna", Image = "http://ww1.hdnux.com/photos/67/00/47/14420420/3/920x920.jpg", LastKnownLoc = "514 West Balboa Boulevard, Newport Beach, CA 92661", Status = "lost", LostSince = "09/12/17", Description = "Pure fluffy white with black collar tag, please reach out with information on tag", OwnerId = 1});

        _context.Pets.Add(new Pet() { Id = 5, Name = "Misty", Image = "https://cdn.thinglink.me/api/image/767377576548106240/1240/10/scaletowidth", Status = "not lost", Description = "Unicorn cat with the colors of the rainbow", OwnerId = 2});
        _context.Pets.Add(new Pet() { Id = 6, Name = "Rocky", Image = "https://www.what-dog.net/Images/faces2/scroll006.jpg", Status = "not lost", Description = "Brown and white, fluffy", OwnerId = 2});
        _context.Pets.Add(new Pet() { Id = 7, Name = "Duke", Image = "https://www.dogstrust.org.uk/sponsor/_dogs/bubba-assets/v800_bubba1.jpg", LastKnownLoc = "2920 Zoo Drive, San Diego, CA 92101", Status = "lost", LostSince = "11/04/17", Description = "Wearing black and yellow collar", OwnerId = 2});
        _context.Pets.Add(new Pet() { Id = 8, Name = "Maggie", Image = "http://store.barnettharley.com/common/images/products/large/h6701-h-pbw12-1.jpg", LastKnownLoc = "1126 Queens Highway, Long Beach, CA 90802", Status = "lost", LostSince = "01/25/18", Description = "Black and white, wearing pink collar", OwnerId = 2});

        _context.Pets.Add(new Pet() { Id = 9, Name = "Molly", Image = "https://static.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg", Status = "not lost", Description = "Pure white and blue eyes", OwnerId = 3});
        _context.Pets.Add(new Pet() { Id = 10, Name = "Bailey", Image = "https://s-media-cache-ak0.pinimg.com/originals/b9/fb/03/b9fb03ae89ffe4e86fe373de2223c1f5.jpg", LastKnownLoc = "5333 Zoo Drive, Los Angeles, CA 90027", Status = "lost", LostSince = "01/03/18", Description = "Last seen wearing a yellow crown", OwnerId = 3});
        _context.Pets.Add(new Pet() { Id = 11, Name = "Jude", Image = "https://strikingattheroots.files.wordpress.com/2015/06/white-rabbit.jpg", Status = "not lost", Description = "Pure white, very nice and shy", OwnerId = 3});        
        _context.Pets.Add(new Pet() { Id = 12, Name = "Tucker", Image = "https://www.dogtopia.com/santa-ana-south-coast/wp-content/uploads/sites/110/2016/01/dog-sit-homepage1.png", Status = "not lost", Description = "Black and white spotty like from 101 Dalmatians", OwnerId = 3});

        _context.Pets.Add(new Pet() { Id = 13, Name = "Smokey", Image = "https://images-na.ssl-images-amazon.com/images/I/7197fUWmHgL._SL1500_.jpg", LastKnownLoc = "1313 Disneyland Drive, Anaheim, CA 92802", Status = "lost", LostSince = "01/15/18", Description = "White and gray with hazel eyes, wearing red collar with gold bells", OwnerId = 4});
        _context.Pets.Add(new Pet() { Id = 14, Name = "Charlie", Image = "http://dognamesearch.com/wp-content/uploads/2014/05/puppy-sound-300x289.jpg", LastKnownLoc = "200 Santa Monica Pier A, Santa Monica, CA 90401", Status = "lost", LostSince = "01/02/18", Description = "Brown, cool guy, was wearing earphones", OwnerId = 4});
        _context.Pets.Add(new Pet() { Id = 15, Name = "Bella", Image = "https://www.dabneydriveanimalhospital.com/wp-content/uploads/2011/02/63324259.jpg",Status = "not lost", Description = "Pure white with dark brown left ears", OwnerId = 4});
        _context.Pets.Add(new Pet() { Id = 16, Name = "Bear", Image = "https://static1.squarespace.com/static/5926393e37c581e161930ba0/t/592644ace58c62c9eacf7a73/1495680243028/Raw+Diet+k9?format=300w", LastKnownLoc = "100 Universal City Plaza, Universal City, CA 91608", Status = "lost", LostSince = "01/19/18", Description = "Super pure white and fluffy, wearing red and black collar", OwnerId = 4});

        _context.Pets.Add(new Pet() { Id = 17, Name = "Lucy", Image = "http://hrschicago.com/wp-content/uploads/2012/02/1294076092_iStock_000008593092XSmall.jpg", Status = "not lost", Description = "Light brown and white", OwnerId = 5});        
        _context.Pets.Add(new Pet() { Id = 18, Name = "Lola", Image = "http://cdn1-www.dogtime.com/assets/uploads/gallery/pit-bull-dog-breed-pictures/pit-bull-dog-breed-picture-10.jpg", LastKnownLoc = "28241 La Paz Road, Laguna Niguel, CA 92677", Status = "lost", LostSince = "01/20/18", Description = "Light brown and white, light brown eyes, last wearing silver and magenta princess tiara with magenta beads necklace", OwnerId = 5}); 
        _context.Pets.Add(new Pet() { Id = 19, Name = "Jack", Image = "https://s7d2.scene7.com/is/image/PetSmart/SV0201_CATEGORY_BKG-Grooming-20160818", LastKnownLoc = "8039 Beach Boulevard, Buena Park, CA 90620", Status = "lost", LostSince = "02/14/17", Description = "Light brown and white, wearing orange and blue bowtie", OwnerId = 5});          
        _context.Pets.Add(new Pet() { Id = 20, Name = "Kitty", Image = "https://redtricom.files.wordpress.com/2017/02/bub-yes-with-no-yes-copy-tighter-brighter.jpg", Status = "not lost", Description = "Black, brown, and white stripes, has green eyes and likes to stick out its tiny tongue", OwnerId = 5}); 

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

      if (s.Name != null && s.Name != "" && s.Image != null && s.Image != "" && s.Status != null && s.Status != "")

      {
        s.Id = _context.Pets.Count()+1;
        _context.Pets.Add(s);
        _context.SaveChanges(); 
        return s;
      }
      return null;
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