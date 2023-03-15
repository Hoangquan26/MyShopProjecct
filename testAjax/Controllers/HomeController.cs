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
        public JsonResult loadPreviewProduct(int? _maTheLoai, int _soLuongSanPham, int _page = 1)
        {
            try
            {
                var rs = ProductAction .loadProduct().ToList();
                List<SanPham> products = new List<SanPham>();
                if (_maTheLoai == null || _maTheLoai == 0)
                {
                    products = rs.Skip(_soLuongSanPham * (_page - 1)).Take(_soLuongSanPham).ToList();
                }
                else
                {
                    products = rs.Skip((_page - 1) * _soLuongSanPham).Where(item => item.theLoaiSanPham == _maTheLoai).Take(_soLuongSanPham).ToList();
                }
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