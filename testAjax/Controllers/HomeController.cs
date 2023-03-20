using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using testAjax.Models;

namespace testAjax.Controllers
{
    public class HomeController : Controller
    {
        protected enum sortOrder{
            desc_money,
            asc_money,
            asc_date
        }
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult loadPreviewProduct(int[] _maTheLoai, int _soLuongSanPham, int _page = 1, int[] _maHangSanXuat = null, string _tenSanPham = "", int _sortOrdered = -1)
        {
            try
            {
                var rs = ProductAction.loadProduct().Where(item => item.tenSanPham.ToLower().Contains(_tenSanPham.ToLower())).ToList();
                List<SanPham> listProducts = new List<SanPham>();
                List<SanPham> products = new List<SanPham>();
                if ( _maTheLoai == null)
                {
                    listProducts = rs;
                }
                else
                {
                    foreach(var id in _maTheLoai)
                    {
                        List<SanPham> list = new List<SanPham>();
                        list = rs.Where(item => item.theLoaiSanPham == id).ToList();
                        listProducts.AddRange(list);
                    }
                }
                List<SanPham> filterBrandList = new List<SanPham>();
                if (_maHangSanXuat == null)
                {
                    filterBrandList = rs;
                }
                else
                {
                    foreach(var id in _maHangSanXuat)
                    {
                        List<SanPham> list = new List<SanPham>();
                        list = rs.Where(item => item.maHangSanXuat == id).ToList();
                        filterBrandList.AddRange(list);
                    }
                }
                listProducts = listProducts.Intersect(filterBrandList).ToList();
                switch(_sortOrdered)
                {
                    case (int)sortOrder.asc_money: 
                        listProducts = listProducts.OrderBy(item => item.giaSanPham).ToList();
                        break;
                    case (int)sortOrder.desc_money:
                        listProducts = listProducts.OrderByDescending(item => item.giaSanPham).ToList();
                        break;
                    default:
                        break;
                }
                products = listProducts.Skip((_page - 1) * _soLuongSanPham).Take(_soLuongSanPham).ToList();
                double _numberPage  = Math.Ceiling((double) listProducts.Count / _soLuongSanPham);
                return Json(new {code = 200, listProduct = from p in products
                                                           select new
                                                           {
                                                               p.maSanPham,
                                                               p.tenSanPham,
                                                               p.giaSanPham,
                                                               p.hinhAnhSanPham
                                                           },
                                                           numberPage = _numberPage
                }, JsonRequestBehavior.AllowGet);
            }
            catch 
            {
                return Json(new {code = 500, errorMessage = "Lỗi"}, JsonRequestBehavior.AllowGet);
            }
        }
    }
}