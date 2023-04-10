namespace testAjax.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("DonHang")]
    public partial class DonHang
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public DonHang()
        {
            ChiTietDonHangs = new HashSet<ChiTietDonHang>();
        }

        [Key]
        [StringLength(100)]
        public string maDonHang { get; set; }

        public int? maKhachHang { get; set; }

        public int? giaTri { get; set; }

        [Column(TypeName = "smalldatetime")]
        public DateTime? ngayDat { get; set; }

        public int? trangThaiDonHang { get; set; }

        [StringLength(2000)]
        public string diaChi { get; set; }

        [StringLength(10)]
        public string sdt { get; set; }

        [StringLength(50)]
        public string email { get; set; }

        [StringLength(1000)]
        public string ghiChu { get; set; }

        [StringLength(1000)]
        public string hoTen { get; set; }

        public int? phuongThucThanhToan { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ChiTietDonHang> ChiTietDonHangs { get; set; }

        public virtual TrangThaiDonHang TrangThaiDonHang1 { get; set; }

        public virtual Payment Payment { get; set; }

        public virtual WebUser WebUser { get; set; }
    }
}
