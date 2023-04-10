namespace testAjax.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class SanPham_YeuThich
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID { get; set; }

        public int? User_ID { get; set; }

        [StringLength(100)]
        public string SanPham_ID { get; set; }

        [Column(TypeName = "smalldatetime")]
        public DateTime? Time { get; set; }

        public virtual SanPham SanPham { get; set; }

        public virtual WebUser WebUser { get; set; }
    }
}
