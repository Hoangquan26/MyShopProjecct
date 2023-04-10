namespace testAjax.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ChiTietDonHang")]
    public partial class ChiTietDonHang
    {
        [Key]
        [Column(Order = 0)]
        [StringLength(100)]
        public string maDonHang { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(100)]
        public string maSanPham { get; set; }

        public int? soLuong { get; set; }

        public int? giaBan { get; set; }

        public virtual DonHang DonHang { get; set; }

        public virtual SanPham SanPham { get; set; }
    }
}
