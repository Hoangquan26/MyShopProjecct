using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations.Model;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Web;

namespace testAjax.Models
{
    public class UserModeForAdmin
    {
        public UserModeForAdmin() {
            this.Users = new MyEntities().WebUsers.ToList();
            this.ChucNangs = new MyEntities().ChucNangs.ToList();
        }
        public List<WebUser> Users { get; set; }
        public List<ChucNang> ChucNangs { get; set; }
    }
}