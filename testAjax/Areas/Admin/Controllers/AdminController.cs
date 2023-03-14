using Microsoft.Ajax.Utilities;
using System;
using System.Data.Entity.Core;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Web;
using System.Web.Mvc;
using testAjax.App_Start;
using testAjax.Models;

namespace testAjax.Areas.Admin.Controllers
{
    public class AdminController : Controller
    {
        // GET: Admin/Admin
        [LoginAuthorize(Roles = "admin_priority")]
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ListUser()
        {
            return View();
        }
        [HttpPost]
        public JsonResult GetList(string _param ="")
        {
            UserModeForAdmin myUser = new UserModeForAdmin();
            try
            {
                var rs = myUser.Users.ToList();
                if (rs != null)
                {
                    var filter = rs.Where(item => item.UserName.Contains(_param)).ToList();
                    var returnValue = from l in filter
                                      select new
                                      {
                                          l.id,
                                          l.UserName,
                                          ngayTaoTaiKhoan = String.Format("{0:dd/MM/yyyy}", l.ngayTaoTaiKhoan),
                                          l.isAdmin
                                      };
                    return Json(new { code = 200, listUser = returnValue.ToList() }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { code = 500, errorMessage = "Không lấy được danh sách" }, JsonRequestBehavior.AllowGet);

                }
            }
            catch
            {
                return Json(new { code = 500, errorMessage = "Lỗi" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult getUserInfomation(int _id)
        {
            UserModeForAdmin myUser = new UserModeForAdmin();
            try
            {
                var rs = myUser.Users.ToList();
                var pq = new MyEntities().PhanQuyens.ToList();
                if (rs != null)
                {
                    var returnValue = from l in rs
                                      where l.id == _id
                                      select new
                                      {
                                          l.id,
                                          l.UserName,
                                          l.PassWord,
                                          l.gmail,
                                          ngayTaoTaiKhoan = string.Format("{0:dd/MM/yyyy}", l.ngayTaoTaiKhoan),
                                          l.isAdmin,
                                          l.avatarPath
                                      };
                    var getPriotiry = from l in pq
                                      where l.UserId == _id
                                      select new
                                      {
                                          l.MaChucNang
                                      };
                    return Json(new { code = 200, userInfo = returnValue, priority = getPriotiry }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { code = 500, errorMessage = "Không lấy được danh sách" }, JsonRequestBehavior.AllowGet);

                }
            }
            catch
            {
                return Json(new { code = 500, errorMessage = "Lỗi" }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult getListChucNang()
        {
            UserModeForAdmin myUser = new UserModeForAdmin();
            try
            {
                var rs = myUser.ChucNangs.ToList();
                if (rs != null)
                {
                    var returnValue = from l in rs
                                      select new
                                      {
                                          l.MaChucNang,
                                          l.TenChucNang
                                      };
                    return Json(new { code = 200, listChucNang = returnValue }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { code = 500, errorMessage = "Không lấy được danh sách" }, JsonRequestBehavior.AllowGet);

                }
            }
            catch
            {
                return Json(new { code = 500, errorMessage = "Lỗi" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult UpdateAjax(int _id, string _username, string _password, string _gmail, DateTime ?_ngaytao) {
            UserModeForAdmin myUser = new UserModeForAdmin();
            try
            {
                MyEntities db = new MyEntities();
                var users = db.WebUsers;
                var updateData = users.SingleOrDefault(item => item.id == _id);
                if(_username != null && _username != "")
                    updateData.UserName= _username;
                if(_password != null && _password != "")
                    updateData.PassWord = _password;
                if (_gmail != null && _gmail != "")
                    updateData.gmail = _gmail;
                if (_ngaytao > DateTime.MinValue && _ngaytao < DateTime.MaxValue && _ngaytao != null)
                    updateData.ngayTaoTaiKhoan = _ngaytao;
                db.SaveChanges();
                return Json(new { code = 200, successMessage = "Thành công"}, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(new { code = 500, errorMessage = "Lỗi" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult UpdatePriority(int _idUser, string _maChucNang)
        {
            try
            {
                MyEntities db = new MyEntities();
                var pq = db.PhanQuyens;
                var returnrs = pq.SingleOrDefault(item => item.UserId == _idUser && item.MaChucNang == _maChucNang);
                if(returnrs != null ) {
                    db.PhanQuyens.Remove(returnrs);
                }
                else
                {
                    pq.Add(new PhanQuyen()
                    {
                        UserId = _idUser,
                        MaChucNang = _maChucNang
                    });
                    db.SaveChanges();
                }
                var rs = pq;
                db.SaveChanges();
                return Json(new { code = 200, successMessage = "Thành công" }, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(new { code = 500, errorMessage = "Lỗi" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult UpdateUserAvatar(int id,HttpPostedFileBase avatarPath)
        {
            try
            {
                if(avatarPath != null && avatarPath.ContentLength > 0) {
                    var fileName = Path.GetFileName(avatarPath.FileName);
                    var path = Path.Combine(Server.MapPath("~/images/avatars/") + fileName);
                    var myPath = Path.Combine("/images/avatars/" + fileName);
                    avatarPath.SaveAs(path);
/*                    MyEntities mydb = new MyEntities();
                    var fileLocation = mydb.WebUsers.SingleOrDefault(item => item.id == 14);*//*
                    fileLocation.avatarPath = myPath.ToString();*//*
                    mydb.SaveChanges();         */           
                    string connectStr = "Data Source=LAPTOP-Q23S0AEG\\MSSQLSERVER01;Initial Catalog=NewApp;Integrated Security=True";
                    var mysql = new SqlConnection(connectStr);
                    mysql.Open();
                    string command = "Update WebUser set avatarPath = N\'" + myPath + "\' where id = " + id;
                    var myCommand = new SqlCommand(command, mysql);
                    myCommand.Parameters.Clear();
                    myCommand.CommandType = System.Data.CommandType.Text;
                    myCommand.ExecuteNonQuery();
                    mysql.Close();
                    return Json(new { code = 200, SuccessMessage = "Thành Công", newPath = myPath}, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { code = 500, ErrorMessage = "Thất bại" }, JsonRequestBehavior.AllowGet);
                }
            }
            catch
            {
                return Json(new { code = 500, ErrorMessage = "Thất bại" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}