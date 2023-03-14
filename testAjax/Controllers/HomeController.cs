using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using testAjax.Models;

namespace testAjax.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult loadPreviewProduct(int _maTheLoai)
        {
            try
            {
                var rs = ProductAction.loadProduct().ToList();
                var products = rs.Where(item => item.theLoaiSanPham == _maTheLoai).Take(8).ToList();
                return Json(new {code = 200, listProduct = from p in products
                                                           select new
                                                           {
                                                               p.maSanPham,
                                                               p.tenSanPham,
                                                               p.giaSanPham,
                                                               p.hinhAnhSanPham
                                                           }
                }, JsonRequestBehavior.AllowGet);
            }
            catch 
            {
                return Json(new {code = 500, errorMessage = "Lỗi"}, JsonRequestBehavior.AllowGet);
            }
        }
    }
}