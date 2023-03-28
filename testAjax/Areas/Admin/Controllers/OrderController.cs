using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml.Linq;
using testAjax.Models;

namespace testAjax.Areas.Admin.Controllers
{
    public class OrderController : Controller
    {
        // GET: Admin/Order
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetOrder(int _page, int _orderStatus)
        {
            try
            {
                MyEntities db = new MyEntities();
                var payments = db.Payments;
                var orders = db.DonHangs;
                var products = db.SanPhams;
                var ChiTiet_DonHang = db.ChiTietDonHangs;
                var status = db.TrangThaiDonHangs;
                List<DonHang> _data = new List<DonHang>();
                if (_orderStatus == 0)
                    _data = orders.OrderBy(item => item.ngayDat).Skip(6 * (_page - 1)).Take(6).ToList();
                else
                    _data = orders.OrderBy(item => item.ngayDat).Where(item => item.trangThaiDonHang == _orderStatus).Skip(6 * (_page - 1)).Take(6).ToList();
                var _pageSize = (_orderStatus == 0 ? orders.Count() : orders.Where(item =>item.trangThaiDonHang == _orderStatus).Count());
                var returnValue = (from o in _data
                       join p in payments on o.phuongThucThanhToan equals p.maPhuongThuc
                       select new
                       {
                           o.maDonHang,
                           payment = p.tenPhuongThuc,
                           o.giaTri,
                           ngayDat = new DateTimeOffset(o.ngayDat.Value.Ticks, TimeSpan.Zero).ToString("o"),
                           o.trangThaiDonHang
                       }).ToList();
                List<object> myData = new List<object>();
                returnValue.ForEach(item =>
                {
                    var product = (from ct in ChiTiet_DonHang
                                  join p in products on ct.maSanPham equals p.maSanPham
                                  where (ct.maDonHang == item.maDonHang)
                                  select new
                                  {
                                      p.tenSanPham,
                                      p.soLuongSanPham
                                  }).ToList();
                    var passData = new
                    {
                        item.maDonHang,
                        item.payment,
                        item.giaTri,
                        item.ngayDat,
                        item.trangThaiDonHang,
                        productsList = product
                    };
                    myData.Add(passData);
                });
                return Json(new
                {
                    code = 200,
                    data = myData,
                    total = _pageSize
                }, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(new
                {
                    code = 500
                    ,
                    JsonRequestBehavior.AllowGet
                });
            }
        }

        [HttpPost]
        public JsonResult UpdateStatus(string _id, int _updateId)
        {
            try
            {
                MyEntities db = new MyEntities();
                var status = db.DonHangs;
                status.SingleOrDefault(order => order.maDonHang.Contains(_id)).trangThaiDonHang = _updateId;
                db.SaveChanges();
                return Json(new
                {
                    code= 200
                }, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(new
                {
                    code = 500,
                    JsonRequestBehavior.AllowGet
                });
            }
        }
    }
}