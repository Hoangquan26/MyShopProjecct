namespace testAjax.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("WebUser")]
    public partial class WebUser
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public WebUser()
        {
            DonHangs = new HashSet<DonHang>();
            PhanQuyens = new HashSet<PhanQuyen>();
            SanPham_YeuThich = new HashSet<SanPham_YeuThich>();
        }

        public int id { get; set; }

        [StringLength(30)]
        public string UserName { get; set; }

        [StringLength(30)]
        public string PassWord { get; set; }

        [StringLength(30)]
        public string gmail { get; set; }

        [Column(TypeName = "smalldatetime")]
        public DateTime? ngayTaoTaiKhoan { get; set; }

        [StringLength(100)]
        public string avatarPath { get; set; }

        public bool? isAdmin { get; set; }

        [StringLength(500)]
        public string diaChi { get; set; }

        [StringLength(10)]
        public string dienThoai { get; set; }

        [StringLength(300)]
        public string hoTen { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DonHang> DonHangs { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PhanQuyen> PhanQuyens { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SanPham_YeuThich> SanPham_YeuThich { get; set; }
    }
}
