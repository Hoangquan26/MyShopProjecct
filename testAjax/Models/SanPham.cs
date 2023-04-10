namespace testAjax.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("SanPham")]
    public partial class SanPham
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SanPham()
        {
            ChiTietDonHangs = new HashSet<ChiTietDonHang>();
            SanPham_YeuThich = new HashSet<SanPham_YeuThich>();
        }

        [Key]
        [StringLength(100)]
        public string maSanPham { get; set; }

        [StringLength(200)]
        public string tenSanPham { get; set; }

        [StringLength(3999)]
        public string moTaSanPham { get; set; }

        public int? giaSanPham { get; set; }

        public int? soLuongSanPham { get; set; }

        public int? theLoaiSanPham { get; set; }

        [StringLength(100)]
        public string hinhAnhSanPham { get; set; }

        public int? maHangSanXuat { get; set; }

        [StringLength(3999)]
        public string hinhAnhSanPhamPath { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ChiTietDonHang> ChiTietDonHangs { get; set; }

        public virtual HangSanXuat HangSanXuat { get; set; }

        public virtual LoaiSanPham LoaiSanPham { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SanPham_YeuThich> SanPham_YeuThich { get; set; }
    }
}
