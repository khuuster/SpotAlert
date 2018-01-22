using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    public class Email
    {
        public string From { get; set; }
        public string FromName { get; set; }
        public string Subject {get; set;}
        public string To {get; set; }
        public string UserName { get; set; }
        public string Content {get; set; }
    }
}