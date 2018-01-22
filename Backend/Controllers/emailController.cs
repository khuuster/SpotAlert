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
      [HttpPost]
    public void Post([FromBody] Email e)
    {  
      var client = new SendGridClient("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");
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