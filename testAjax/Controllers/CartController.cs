using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
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
        public JsonResult LoadOrder()
        {
            try
            {
                WebUser User = (WebUser)Session["user"];
                var db = new MyEntities();
                var status = db.TrangThaiDonHangs;
                var donHang = db.DonHangs;
                var ChiTietDonHang = db.ChiTietDonHangs;
                var SanPham = db.SanPhams;
                HttpCookie myCookie = Request.Cookies.Get(ConfigurationManager.AppSettings["OrderCookie"]);
                string OrderCookie = myCookie?.Value;
                var userID = ((WebUser)Session["user"])?.id;
                IQueryable<DonHang> userOrder = donHang.Where(order => order.maKhachHang == userID);
                IQueryable<DonHang> cookieOrder = donHang.Where(order => OrderCookie.Contains(order.maDonHang));
                string maDHs = string.Join("*",userOrder.Select(dh => dh.maDonHang).ToList());
                if (userID != null)
                {
                    cookieOrder = cookieOrder.Except(userOrder);
                    if (myCookie != null)
                    {
                        cookieOrder.ForEach(order => order.maKhachHang = userID);
                        db.SaveChanges();
                        myCookie.Expires = DateTime.Now.AddDays(-1);
                        Response.Cookies.Add(myCookie);
                    }
                    userOrder = userOrder.Union(cookieOrder);
                    cookieOrder= userOrder;
                }
                var returnValue = from o in cookieOrder
                                  join tt in status on o.trangThaiDonHang equals tt.maTrangThai
                                  select new { o.maDonHang, ngayDat = o.ngayDat, o.giaTri,status = tt.tenTranThai };
                var ChiTiet_SanPham = (from ct in ChiTietDonHang
                                       join sp in SanPham on ct.maSanPham equals sp.maSanPham
                                       where (OrderCookie.Contains(ct.maDonHang) || maDHs.Contains(ct.maDonHang)) 
                                       select new
                                       {
                                           ct.maDonHang,
                                           ct.soLuong,
                                           sp.tenSanPham
                                       }).ToList();
                return Json(new {code = 200, orders = returnValue,
                orderInfo = ChiTiet_SanPham}, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(new { code = 500 }, JsonRequestBehavior.AllowGet);
            }
        }

    }
}