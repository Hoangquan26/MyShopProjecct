using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using testAjax.Models;
namespace testAjax.Areas.Admin.Controllers
{
    public class BrandController : Controller
    {
        // GET: Admin/Brand
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult loadProduct(string myParam = "")
        {
            try
            {
                List<SanPham> products = ProductAction.loadProduct().Where(item => item.tenSanPham.ToLower().Contains(myParam.ToLower())). ToList();
                List<HangSanXuat> brands = Brands.getBrands();
                List<LoaiSanPham> categorys= CategoryAction.loadCategory();
                return Json(new
                {
                    code = 200,
                    listProduct = from p in products
                                  join b in brands on p.maHangSanXuat equals b.maHangSanXuat
                                  join c in categorys on p.theLoaiSanPham equals c.maTheLoai
                                  select new
                                  {
                                      p.tenSanPham,
                                      p.giaSanPham,
                                      p.soLuongSanPham,
                                      c.tenTheLoai,
                                      p.hinhAnhSanPham,
                                      b.tenHangSanXuat
                                  }
                }, JsonRequestBehavior.AllowGet);
            }
            catch {
                return Json(new {code = 500, errorMessage = "Lỗi"}, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult loadBrand()
        {
            try
            {
                List<HangSanXuat> brands = Brands.getBrands();
                var categorys = CategoryAction.loadCategory();
                return Json(new
                {
                    code = 200,
                    listBrand = from b in brands
                                select new
                                {
                                    b.maHangSanXuat,
                                    b.tenHangSanXuat
                                },
                    listCategory = from b in categorys
                                select new
                                {
                                    b.maTheLoai,
                                    b.tenTheLoai
                                }
                }, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(new { code = 500, errorMessage = "Lỗi" }, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        [ValidateInput(false)]
        public JsonResult AddProduct(FormCollection collection, HttpPostedFileBase _hinhAnhSanPham)
        {
            var _maSanPham = collection["_maSanPham"];
            var _tenSanPham = collection["_tenSanPham"];
            var _moTaSanPham = collection["_moTaSanPham"];
            int _giaSanPham =int.Parse(collection["_giaSanPham"]);
            var _soLuongSanPham =int.Parse(collection["_soLuongSanPham"]);
            var _theLoaiSanPham = int.Parse(collection["_theLoaiSanPham"]);
            var _maHangSanXuat = int.Parse(collection["_maHangSanXuat"]);
            string myPath = "";
            if (_hinhAnhSanPham != null && _hinhAnhSanPham.ContentLength > 0)
            {
                string pathName = Path.GetFileName(_hinhAnhSanPham.FileName);
                string savePath = Path.Combine(Server.MapPath("~/images/") + pathName);
                myPath = Path.Combine("/images/" + pathName);
                _hinhAnhSanPham.SaveAs(savePath);
            }
            if (ProductAction.addProduct(_maSanPham, _tenSanPham, _moTaSanPham, _giaSanPham, _soLuongSanPham, _theLoaiSanPham, myPath, _maHangSanXuat) == true)
                return Json(new { code = 200, successMessage = "Thêm mới thành công" }, JsonRequestBehavior.AllowGet);
            else
                return Json(new { code = 500, successMessage = "Thêm mới thất bại" }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult getBrandsData()
        {
            try
            {
                var brands = Brands.getBrands().ToList();
                var products = ProductAction.loadProduct().ToList();
                var newList = (from b in brands
                               join p in products on b.maHangSanXuat equals p.maHangSanXuat
                               group p by b.tenHangSanXuat into g
                               select new
                               {
                                   tenHangSanXuat = g.Key,
                                   soLuongSanPham = g.Sum(item => item.soLuongSanPham)
                               });
                return Json(new { code = 200, brandsData = newList }, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(new { code = 500, errorMessage = "Lỗi" }, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult getCategoryData()
        {
            try
            {
                var brands = CategoryAction.loadCategory().ToList();
                var products = ProductAction.loadProduct().ToList();
                var newList = (from b in brands
                               join p in products on b.maTheLoai equals p.theLoaiSanPham
                               group p by b.tenTheLoai into g
                               select new
                               {
                                   tenTheLoai = g.Key,
                                   soLuongSanPham = g.Sum(item => item.soLuongSanPham)
                               }).ToList();
                return Json(new { code = 200, brandsData = newList }, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(new { code = 500, errorMessage = "Lỗi" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}