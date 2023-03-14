using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace testAjax.Models
{
    public class ProductAction
    {
        public static List<SanPham> loadProduct()
        {
            MyEntities db = new MyEntities();
            var products = db.SanPhams.ToList();
            return products;
        }
        public static bool addProduct (string _maSanPham, string _tenSanPham, string _moTaSanPham, int _giaSanPham, int _soLuongSanPham, int _theLoaiSanPham, string myPath, int _maHangSanPham)
        {
            try
            {
                /*               MyEntities db = new MyEntities();
                               var SanPham = db.SanPhams;
                               SanPham.Add(new Models.SanPham()
                               {
                                   maSanPham = _maSanPham,
                                   tenSanPham = _tenSanPham,
                                   moTaSanPham = _moTaSanPham,
                                   giaSanPham = _giaSanPham,
                                   soLuongSanPham = _soLuongSanPham,
                                   theLoaiSanPham = _theLoaiSanPham,
                                   hinhAnhSanPham = myPath,
                                   maHangSanXuat = _maHangSanPham
                               });
                               db.SaveChanges();*/
                var mySql = new SqlConnection("Data Source=LAPTOP-Q23S0AEG\\MSSQLSERVER01;Initial Catalog=NewApp;Integrated Security=True");
                mySql.Open();
                string command = $"INSERT INTO SanPham VALUES('{_maSanPham}', N'{_tenSanPham}',N'{_moTaSanPham}', {_giaSanPham}, {_soLuongSanPham}, {_theLoaiSanPham}, N'{myPath}', {_maHangSanPham})";
                SqlCommand myCommand = new SqlCommand(command, mySql);
                myCommand.ExecuteNonQuery();
                mySql.Close();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}