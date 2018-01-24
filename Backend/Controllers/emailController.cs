using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Backend.Controllers
{
   [Route("api/email")]
  public class emailController : Controller
  { 
    public emailController()
    {
       DotNetEnv.Env.Load();
    }
   
      [HttpPost]
    public void Post([FromBody] Email e)
    
    { 
      var emailKey = Environment.GetEnvironmentVariable("apikey");
      var client = new SendGridClient(emailKey);
      var from = new EmailAddress(e.From, e.FromName);
      var subject = e.Subject;
      var to = new EmailAddress(e.To, e.UserName);
      var plainTextContent = e.Content;
      var htmlContent = e.Content;
      var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
      var response = client.SendEmailAsync(msg);
            // var apiKey = Environment.GetEnvironmentVariable("apikey");
            // Console.WriteLine(apiKey);
            // var client = new SendGridClient(apiKey);
            // var from = new EmailAddress("test@example.com", "Example User");
            // var subject = "Sending with SendGrid is Fun";
            // var to = new EmailAddress("test@example.com", "Example User");
            // var plainTextContent = "and easy to do anywhere, even with C#";
            // var htmlContent = "<strong>and easy to do anywhere, even with C#</strong>";
            // var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            // var response = client.SendEmailAsync(msg);
    }
  }
}