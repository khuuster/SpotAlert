using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string MessageDate { get; set; }
        public string MessageName {get; set; }
        public string MessageNumber { get; set; }
        public string MessageEmail { get; set; }
        public string Message { get; set; }
        public string MessageRegarding { get; set; }

    }
}