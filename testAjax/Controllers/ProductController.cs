using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using testAjax.Models;

namespace testAjax.Controllers
{
    public class ProductController : Controller
    {
        // GET: Product
        public ActionResult Index(int? _maTheLoai) 
        {
            var products = ProductAction.loadProduct().ToList();
            if(_maTheLoai == null)
            {
                return View(products);
            }
            var productsByCategory = products.Where(item => item.theLoaiSanPham == _maTheLoai).ToList();
            return View(productsByCategory);
        }

        public ActionResult ProductDetail(string id)
        {
            if(id == null)
            {
                return View("Error");
            }
            var products = ProductAction.loadProduct().ToList();
            var categorys = CategoryAction.loadCategory().ToList();
            var model = products.SingleOrDefault(item => item.maSanPham == id);
            var myCategory = categorys.SingleOrDefault(item => item.maTheLoai == model.theLoaiSanPham);
            ViewBag.CategoryLink = myCategory.tenTheLoai.ToString();
            return View(model);
        }

        [HttpPost]
        public JsonResult getRelateProduct(string id)
        {
            try
            {
                var products = ProductAction.loadProduct().ToList();
                var c = products.Where(item => item.maSanPham!= id).ToList();
                var myProduct = products.FirstOrDefault(item => item.maSanPham == id);
                var realteProducts = c.Where(item => item.theLoaiSanPham == myProduct.theLoaiSanPham || item.maHangSanXuat == myProduct.maHangSanXuat).ToList();
                return Json(new
                {
                    code = 200,
                    relateProduct = from p in realteProducts
                                    select new
                                    {
                                        p.maSanPham,
                                        p.tenSanPham,
                                        p.hinhAnhSanPham,
                                        p.giaSanPham
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