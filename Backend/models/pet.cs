using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    public class Pet
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image {get; set; }
        public string LastKnownLoc {get; set;}
        public string Status {get; set; }
        public string LostSince {get; set;}   
        public string Description {get;set; } 
        public int OwnerId {get; set;}
        
       

        
    }
}