namespace testAjax.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("PhanQuyen")]
    public partial class PhanQuyen
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int UserId { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(50)]
        public string MaChucNang { get; set; }

        [StringLength(50)]
        public string GhiChu { get; set; }

        public virtual ChucNang ChucNang { get; set; }

        public virtual WebUser WebUser { get; set; }
    }
}
