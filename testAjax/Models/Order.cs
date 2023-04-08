using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace testAjax.Models
{
    public class Order
    {
        public static List<DonHang> getOrdersByMonth(int? _month)
        {
            var db = new MyEntities();
            List<DonHang> orders = db.DonHangs.ToList();
            List<DonHang> result = orders.Where(item => item.ngayDat?.Month == _month).ToList();
            return result;
        }
    }
}