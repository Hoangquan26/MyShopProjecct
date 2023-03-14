using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace testAjax.Models
{
    public class CategoryAction
    {
        public static List<LoaiSanPham> loadCategory()
        {
            MyEntities db = new MyEntities();
            var categorys = db.LoaiSanPhams.ToList();
            return categorys;
        }
    }
}