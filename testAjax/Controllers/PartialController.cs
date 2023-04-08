using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace testAjax.Areas.Admin.Controllers
{
    public class PartialController : Controller
    {
        // GET: Admin/Partial
        public PartialViewResult UserDetail()
        {
            return PartialView();
        }
        public PartialViewResult Toast()
        {
            return PartialView();
        }
    }
}