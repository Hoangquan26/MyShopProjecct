using Microsoft.Ajax.Utilities;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using testAjax.Models;

namespace testAjax.Controllers
{
    public class ProductController : Controller
    {
        // GET: Product

        public ActionResult Index(int? _maTheLoai) 
        {
            var categorys = CategoryAction.loadCategory().ToList();
            var brands = Brands.getBrands().ToList();
            if (_maTheLoai == null)
            {
                ViewBag.Name = "Sản Phẩm";
                ViewBag.Categories = categorys;
            }
            else
            {
                var a = categorys.SingleOrDefault(item => item.maTheLoai == _maTheLoai);
                ViewBag.Name = a.tenTheLoai;
                ViewBag.MyCategory = a.maTheLoai;
            }
            ViewBag.Brands = brands;
            return View();
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
        public class SP
        {
            public string ID { set;get; }
            public int quantity { set; get; }
        }

        public class US
        {
            public string hoTen { set; get; }
            public string diaChi { set; get; }
            public string sdt { set; get; }
            public string email { set; get; }
            public string ghiChu { set; get; }
        }
        [HttpPost]
        public JsonResult Buy(DonHang user, SP[] products)
        {
            try
            {
                MyEntities db = new MyEntities();
                var CTDH = db.ChiTietDonHangs;
                var sp = db.SanPhams;
                var dh = db.DonHangs;
                var maKh = Session["user"] == null ? null : (WebUser)Session["user"];
                int? myMkh;
                string strProduct = "";
                if(maKh == null)
                {
                    myMkh = null;
                }
                else
                {
                    myMkh = maKh.id;
                }
                Random rdItem = new Random();
                string randomID = "KD" +rdItem.Next(0, 100) + rdItem.Next(0, 100) + DateTime.Now.Month.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + +rdItem.Next(0, 100) + +rdItem.Next(0, 100);
                int? subTotal = 0;
                products.ForEach(item =>
                {
                    var product = sp.SingleOrDefault(p => p.maSanPham == item.ID);
                    var tenSp = product.tenSanPham;
                    strProduct += $@"<tr>
                                <td width=""75%"" align=""left"" style=""font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;"">
                                     {tenSp}({item.quantity})
                                </td>
                                <td width=""25%"" align=""left"" style=""font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;"">
                                    {(product == null ? 0 : product.giaSanPham)?.ToString("C0", new CultureInfo("vi-VN"))}
                                </td>
                            </tr>";

                    subTotal += (item.quantity * product.giaSanPham);
                    CTDH.Add(new ChiTietDonHang()
                    {
                        maDonHang = randomID,
                        maSanPham = item.ID,
                        soLuong = item.quantity,
                        giaBan = (product == null ? 0 : product.giaSanPham)
                    });
                });
                dh.Add(new DonHang()
                {
                    maDonHang = randomID,
                    maKhachHang = myMkh,
                    giaTri = subTotal + 35000,
                    ngayDat = DateTime.Now,
                    trangThaiDonHang = "Chờ Xác Nhận",
                    diaChi = user.diaChi,
                    sdt = user.sdt,
                    email = user.email,
                    ghiChu = user.ghiChu,
                    hoTen = user.hoTen
                }) ;
                db.SaveChanges();
                var getTemplate = System.IO.File.ReadAllText(Server.MapPath("~/Templates/OrderConfirmTemplate11.html"));
                getTemplate = getTemplate.Replace("{{{maSanPham}}}", randomID);
                getTemplate = getTemplate.Replace("{{{subTotal}}}", subTotal?.ToString("C0", new CultureInfo("vi-VN")));
                getTemplate = getTemplate.Replace("{{{sanPham}}}", strProduct);
                getTemplate = getTemplate.Replace("{{{DeliveryDate}}}", DateTime.Now.AddDays(5).ToShortDateString());
                getTemplate = getTemplate.Replace("{{{sdt}}}", user.sdt);
                getTemplate = getTemplate.Replace("{{{name}}}", user.hoTen);
                Email.sendMail("HoangQuan", "Đặt Hàng Thành Công!", getTemplate, user.email);
                return Json(new {code = 200},JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(new { code = 500 }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}