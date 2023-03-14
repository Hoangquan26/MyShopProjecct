using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;

namespace testAjax.Models
{
    public class Brands
    {
        public static List<HangSanXuat> getBrands()
        {
            MyEntities db = new MyEntities();
            List<HangSanXuat> brands = db.HangSanXuats.ToList();
            return brands;
        }
    }
}