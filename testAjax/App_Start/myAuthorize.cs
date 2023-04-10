using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using testAjax.Models;

namespace testAjax.App_Start
{
    public class LoginAuthorize : AuthorizeAttribute
    {
        public string Roles { set; get; }
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            var user =(WebUser)HttpContext.Current.Session["user"];
            if(user == null)
            {
                filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary (
                    new{
                        controller = "Account",
                        action = "LoginForm",
                        area =""
                    } 
                ));
                return;
            }
            MyEntities db = new MyEntities();
            /*if (db.PhanQuyens.Count(item => item.UserId == user.id && item.MaChucNang == Roles) == 0)
            {
                filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new
                {
                    controller= "Error",
                    action = "Index",
                    area ="Admin"
                }));
            }*/
            if (user.isAdmin == false || user.isAdmin == null)
            {
                filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new
                {
                    controller = "Error",
                    action = "Index",
                    area = "Admin"
                }));
                return;
            }
        }
    }
}