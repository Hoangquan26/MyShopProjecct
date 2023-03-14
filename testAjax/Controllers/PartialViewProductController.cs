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
        public PartialViewResult ProductPage(int? maTheLoai = null)
        {
            var products = ProductAction.loadProduct().ToList();
            if (maTheLoai != null)
            {
                var items = products.Where(item => item.theLoaiSanPham == maTheLoai).ToList();
                products = items.ToList();
            }
            return PartialView(products);
        }
    }
}