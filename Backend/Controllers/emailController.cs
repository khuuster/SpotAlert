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
  public class EmailController : Controller
  { 
    public EmailController()
    {
       DotNetEnv.Env.Load();
    }
   
      [HttpPost]
    public void Post([FromBody] Email e)
    {  
      var client = new SendGridClient("apikey"); // replace "apikey" with api key
      var from = new EmailAddress(e.From, e.FromName);
      var subject = e.Subject;
      var to = new EmailAddress(e.To, e.UserName);
      var plainTextContent = e.Content;
      var htmlContent = e.Content;
      var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
      var response = client.SendEmailAsync(msg);
    }
  }
}