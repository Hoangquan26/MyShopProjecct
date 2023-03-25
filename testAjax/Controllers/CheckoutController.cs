using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using testAjax.Models;

namespace testAjax.Controllers
{
    public class CheckoutController : Controller
    {
        // GET: Checkout
        public ActionResult Index()
        {
            return View();
        }

        public class SP
        {
            public string ID { set; get; }
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
                if (maKh == null)
                {
                    myMkh = null;
                }
                else
                {
                    myMkh = maKh.id;
                }
                Random rdItem = new Random();
                string randomID = "KD" + rdItem.Next(0, 100) + rdItem.Next(0, 100) + DateTime.Now.Month.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + +rdItem.Next(0, 100) + +rdItem.Next(0, 100);
                int? subTotal = 0;
                List<SanPham> returnProducts = new List<SanPham>();
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
                    returnProducts.Add(new SanPham() {
                        tenSanPham = product.tenSanPham,
                        hinhAnhSanPham = product.hinhAnhSanPham,
                        giaSanPham = product.giaSanPham,
                        soLuongSanPham = item.quantity
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
                });
                db.SaveChanges();
                var getTemplate = System.IO.File.ReadAllText(Server.MapPath("~/Templates/OrderConfirmTemplate11.html"));
                getTemplate = getTemplate.Replace("{{{maSanPham}}}", randomID);
                getTemplate = getTemplate.Replace("{{{subTotal}}}", subTotal?.ToString("C0", new CultureInfo("vi-VN")));
                getTemplate = getTemplate.Replace("{{{sanPham}}}", strProduct);
                getTemplate = getTemplate.Replace("{{{DeliveryDate}}}", DateTime.Now.AddDays(5).ToShortDateString());
                getTemplate = getTemplate.Replace("{{{sdt}}}", user.sdt);
                getTemplate = getTemplate.Replace("{{{name}}}", user.hoTen);
                getTemplate = getTemplate.Replace("{{{address}}}", user.diaChi);
                Email.sendMail("HoangQuan", "Đặt Hàng Thành Công!", getTemplate, user.email);
                return Json(new { code = 200 , maDonHang = randomID, thisSubTotal = subTotal, thisProducts = from list in returnProducts
                                                                                    select new
                                                                                    {
                                                                                        list.tenSanPham,
                                                                                        list.giaSanPham,
                                                                                        list.hinhAnhSanPham,
                                                                                        list.soLuongSanPham
                                                                                    }
                }, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(new { code = 500 }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult ThankYou(US user)
        {
            ViewBag.user = user;
            return View();
        }
    }
}