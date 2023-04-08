using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using testAjax.Models;
namespace testAjax.Areas.Admin.Controllers
{
    public class SalesController : Controller
    {
        // GET: Admin/Sales
        public JsonResult getSalesDetail(int? _month)
        {

            try
            {
                if (_month == null)
                {
                    _month = DateTime.Now.Month;
                }
                List<DonHang> listOrder = Order.getOrdersByMonth(_month);
                return Json(new {code = 200,salesData = from o in listOrder
                                             select new
                                             {
                                                 ngayDat = String.Format("{0:dd/MM/yyyy}", o.ngayDat),
                                                 o.giaTri,
                                                 o.trangThaiDonHang
                                             }
                }, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(new
                {
                    code = 500
                }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}