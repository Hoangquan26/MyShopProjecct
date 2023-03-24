using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;

namespace testAjax.Models
{
    public class Email
    {
        protected static string passWord = ConfigurationManager.AppSettings["PasswordEmail"];
        protected static string email = ConfigurationManager.AppSettings["Email"];
        public static bool sendMail (string name, string subject, string content, string toMail)
        {
            bool rs = false;
            try
            {
                MailMessage mess = new MailMessage();
                mess.From = new MailAddress(email);
                mess.Subject = subject;
                mess.Body = content;
                mess.To.Add(toMail);
                mess.IsBodyHtml= true;
                using(var smtp = new SmtpClient())
                {
                    smtp.Host= "smtp.gmail.com";
                    smtp.Port = 587;
                    smtp.EnableSsl= true;
                    smtp.UseDefaultCredentials= false;
                    smtp.Credentials = new NetworkCredential() {
                        UserName = email,
                        Password = passWord
                    };
                    smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                    smtp.Timeout= 20000;
                    smtp.Send(mess);
                }
                rs = true;
            }
            catch {
                rs = false;
            }
            return rs;
        }
    }
}