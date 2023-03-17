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
                List<SanPham> listProducts = new List<SanPham>();
                List<SanPham> products = new List<SanPham>();
                if (_maTheLoai == null || _maTheLoai == 0)
                {
                    listProducts = rs;
                }
                else
                {
                    listProducts = rs.Where(item => item.theLoaiSanPham == _maTheLoai).ToList();
                }
                products = listProducts.Skip((_page - 1) * _soLuongSanPham).Take(_soLuongSanPham).ToList();
                double _numberPage  = Math.Ceiling((double) listProducts.Count / _soLuongSanPham);
                return Json(new {code = 200, listProduct = from p in products
                                                           select new
                                                           {
                                                               p.maSanPham,
                                                               p.tenSanPham,
                                                               p.giaSanPham,
                                                               p.hinhAnhSanPham
                                                           },
                                                           numberPage = _numberPage
                }, JsonRequestBehavior.AllowGet);
            }
            catch 
            {
                return Json(new {code = 500, errorMessage = "Lỗi"}, JsonRequestBehavior.AllowGet);
            }
        }
    }
}