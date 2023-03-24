using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using testAjax.Models;

namespace testAjax.Controllers
{
    public class CartController : Controller
    {
        // GET: Cart
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult LoadCart(string[] id)
        {
            try
            {
                var products = ProductAction.loadProduct().ToList();
                List<SanPham> rs = new List<SanPham>();
                foreach(string x in id)
                {
                    var mySP = products.SingleOrDefault(item => item.maSanPham == x);
                    if(rs != null)
                    rs.Add(mySP);
                }
                return Json(new {code = 200, list = from p in rs 
                                                    select new {
                                                        maSanPham = p.maSanPham,
                                                        tenSanPham = p.tenSanPham,
                                                        giaSanPham = p.giaSanPham,
                                                        soLuongSanPham = p.soLuongSanPham,
                                                        hinhAnhSanPham = p.hinhAnhSanPham
                                                    }
                }, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(new { code = 500, errorMessage = "Lỗi" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}