namespace testAjax.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("HinhAnhSanPham")]
    public partial class HinhAnhSanPham
    {
        [StringLength(200)]
        public string imagePath { get; set; }

        [Key]
        public int maHinhAnh { get; set; }
    }
}
