using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;

namespace testAjax.Models
{
    public partial class MyEntities : DbContext
    {
        public MyEntities()
            : base("name=MyEntities")
        {
        }

        public virtual DbSet<ChiTietDonHang> ChiTietDonHangs { get; set; }
        public virtual DbSet<ChucNang> ChucNangs { get; set; }
        public virtual DbSet<DonHang> DonHangs { get; set; }
        public virtual DbSet<HangSanXuat> HangSanXuats { get; set; }
        public virtual DbSet<HinhAnhSanPham> HinhAnhSanPhams { get; set; }
        public virtual DbSet<LoaiSanPham> LoaiSanPhams { get; set; }
        public virtual DbSet<Payment> Payments { get; set; }
        public virtual DbSet<PhanQuyen> PhanQuyens { get; set; }
        public virtual DbSet<SanPham> SanPhams { get; set; }
        public virtual DbSet<SanPham_YeuThich> SanPham_YeuThich { get; set; }
        public virtual DbSet<TrangThaiDonHang> TrangThaiDonHangs { get; set; }
        public virtual DbSet<WebUser> WebUsers { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ChiTietDonHang>()
                .Property(e => e.maDonHang)
                .IsUnicode(false);

            modelBuilder.Entity<ChiTietDonHang>()
                .Property(e => e.maSanPham)
                .IsUnicode(false);

            modelBuilder.Entity<DonHang>()
                .Property(e => e.maDonHang)
                .IsUnicode(false);

            modelBuilder.Entity<DonHang>()
                .Property(e => e.sdt)
                .IsFixedLength();

            modelBuilder.Entity<DonHang>()
                .HasMany(e => e.ChiTietDonHangs)
                .WithRequired(e => e.DonHang)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<LoaiSanPham>()
                .HasMany(e => e.SanPhams)
                .WithOptional(e => e.LoaiSanPham)
                .HasForeignKey(e => e.theLoaiSanPham);

            modelBuilder.Entity<Payment>()
                .HasMany(e => e.DonHangs)
                .WithOptional(e => e.Payment)
                .HasForeignKey(e => e.phuongThucThanhToan)
                .WillCascadeOnDelete();

            modelBuilder.Entity<SanPham>()
                .Property(e => e.maSanPham)
                .IsUnicode(false);

            modelBuilder.Entity<SanPham>()
                .HasMany(e => e.ChiTietDonHangs)
                .WithRequired(e => e.SanPham)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<SanPham>()
                .HasMany(e => e.SanPham_YeuThich)
                .WithOptional(e => e.SanPham)
                .HasForeignKey(e => e.SanPham_ID)
                .WillCascadeOnDelete();

            modelBuilder.Entity<SanPham_YeuThich>()
                .Property(e => e.SanPham_ID)
                .IsUnicode(false);

            modelBuilder.Entity<TrangThaiDonHang>()
                .HasMany(e => e.DonHangs)
                .WithOptional(e => e.TrangThaiDonHang1)
                .HasForeignKey(e => e.trangThaiDonHang);

            modelBuilder.Entity<WebUser>()
                .Property(e => e.dienThoai)
                .IsUnicode(false);

            modelBuilder.Entity<WebUser>()
                .HasMany(e => e.DonHangs)
                .WithOptional(e => e.WebUser)
                .HasForeignKey(e => e.maKhachHang);

            modelBuilder.Entity<WebUser>()
                .HasMany(e => e.PhanQuyens)
                .WithRequired(e => e.WebUser)
                .HasForeignKey(e => e.UserId);

            modelBuilder.Entity<WebUser>()
                .HasMany(e => e.SanPham_YeuThich)
                .WithOptional(e => e.WebUser)
                .HasForeignKey(e => e.User_ID)
                .WillCascadeOnDelete();
        }
    }
}
