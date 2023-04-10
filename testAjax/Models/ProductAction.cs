using ImageProcessor.Imaging;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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
        public static bool addProduct (string _tenSanPham, string _moTaSanPham, int _giaSanPham, int _soLuongSanPham, int _theLoaiSanPham, string myPath, int _maHangSanPham, string listImages)
        {
            try
            {
                MyEntities db = new MyEntities();
                var SanPham = db.SanPhams;
                var random = new Random();
                SanPham.Add(new Models.SanPham()
                {
                    maSanPham = "GGS_" + random.Next(0, 100) + random.Next(0, 100) + random.Next(0, 100) + random.Next(0, 100) + random.Next(0, 100) + "Ear" + random.Next(0, 100),
                    tenSanPham = _tenSanPham,
                    moTaSanPham = _moTaSanPham,
                    giaSanPham = _giaSanPham,
                    soLuongSanPham = _soLuongSanPham,
                    theLoaiSanPham = _theLoaiSanPham,
                    hinhAnhSanPham = myPath,
                    maHangSanXuat = _maHangSanPham,
                    hinhAnhSanPhamPath = listImages
                });
                db.SaveChanges();
                /*                var mySql = new SqlConnection("Data Source=LAPTOP-Q23S0AEG\\MSSQLSERVER01;Initial Catalog=NewApp;Integrated Security=True");
                                mySql.Open();
                                string command = $"INSERT INTO SanPham VALUES('{_maSanPham}', N'{_tenSanPham}',N'{_moTaSanPham}', {_giaSanPham}, {_soLuongSanPham}, {_theLoaiSanPham}, N'{myPath}', {_maHangSanPham})";
                                SqlCommand myCommand = new SqlCommand(command, mySql);
                                myCommand.ExecuteNonQuery();
                                mySql.Close();*/
                return true;
            }
            catch
            {
                return false;
            }
        }

        public static bool deleteProduct(string id)
        {
            try
            {
                MyEntities db = new MyEntities();
                var products = db.SanPhams;
                var myProduct = products.SingleOrDefault(item => item.maSanPham == id);
                products.Remove(myProduct);
                db.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public static bool importProduct(string id, int quantity, int? price)
        {
            try
            {
                MyEntities db = new MyEntities();
                var products = db.SanPhams;
                var myProduct = products.SingleOrDefault(item => item.maSanPham == id);
                myProduct.soLuongSanPham += quantity;
                if(price != null)
                {
                    myProduct.giaSanPham  = price;
                }
                db.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}