using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using testAjax.Models;

namespace testAjax.Controllers
{
    public class PartialViewProductController : Controller
    {
        // GET: ParitalViewProduct
        public PartialViewResult CategoryList()
        {
            var products = CategoryAction.loadCategory().ToList();
            return PartialView(products);
        }
    }
}