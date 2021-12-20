﻿IF NOT EXISTS (SELECT *
FROM sys.databases
WHERE name = 'QUAN_LI_BAN_HANG_DO_AN_2')
BEGIN
	CREATE DATABASE QUAN_LI_BAN_HANG_DO_AN_2
END;
GO

USE QUAN_LI_BAN_HANG_DO_AN_2
GO

-------------------------------------------------------------
-- CREATE TABLES
-------------------------------------------------------------


CREATE TABLE NhanVien
(
	MaNV INT,
	TenNV NVARCHAR(50),
	DiaChiNV NVARCHAR(MAX),
	SDTNhanVien CHAR(10) UNIQUE,
	NVFlag TINYINT

		CONSTRAINT PK_NV PRIMARY KEY (MaNV)
)

CREATE TABLE TaiKhoan
(
	MaTK INT,
	TenNguoiDung VARCHAR(20),
	MatKhau VARCHAR(60),
	SDT CHAR(10) UNIQUE,
	HoTenKhachHang NVARCHAR(50),
	DiaChi NVARCHAR(MAX)

		CONSTRAINT PK_TK PRIMARY KEY (MaTK)
)

CREATE TABLE KhachHang
(
	MaKH INT,
	TenKH NVARCHAR(50),
	SoDienThoai CHAR(10) UNIQUE,
	DiaChi NVARCHAR(MAX)

		CONSTRAINT PK_KH PRIMARY KEY (MaKH)
)

CREATE TABLE LoaiSanPham
(
	MaLoai INT,
	TenLoai NVARCHAR(MAX)

		CONSTRAINT PK_LSP PRIMARY KEY (MaLoai)
)

CREATE TABLE SanPham
(
	MaSP INT,
	TenSP NVARCHAR(MAX),
	MoTa NVARCHAR(MAX),
	DonGia INT,
	SoLuongTon SMALLINT,
	MaLoai INT,
	HinhAnh VARCHAR(MAX)

		CONSTRAINT PK_SP PRIMARY KEY (MaSP)
)

CREATE TABLE GioHang
(
	MaGH INT,
	MaTK INT

		CONSTRAINT PK_GH PRIMARY KEY (MaGH)
)

CREATE TABLE SPGioHang
(
	MaGH INT,
	MaSP INT,
	SoLuong SMALLINT,
	ThanhTien INT

		CONSTRAINT PK_SPGH PRIMARY KEY (MaGH, MaSP)
)

CREATE TABLE PhieuNhapHang
(
	MaPhieuNhap INT,
	NgayNhap TIMESTAMP,
	TenNhaCungUng NVARCHAR(50),
	NVLapPNH INT

		CONSTRAINT PK_PNH PRIMARY KEY (MaPhieuNhap)
)

CREATE TABLE SanPhamNhap
(
	MaPhieuNhap INT,
	MaSP INT,
	SoLuongNhap SMALLINT

		CONSTRAINT PK_SPN PRIMARY KEY (MaPhieuNhap, MaSP)
)

CREATE TABLE HoaDon
(
	MaHD INT,
	MaKH INT,
	MaTK INT,
	NVLapHD INT,
	ThoiGianLap TIMESTAMP,
	PTThanhToan TINYINT,
	TongTien INT,
	GiaGiam INT,
	TrangThai TINYINT

		CONSTRAINT PK_HD PRIMARY KEY (MaHD)
)

CREATE TABLE SPHoaDon
(
	MaHD INT,
	MaSP INT,
	SoLuongMua SMALLINT,
	GiaBan INT,
	ThanhTien INT

		CONSTRAINT PK_SPHD PRIMARY KEY (MaHD, MaSP)
)

-------------------------------------------------------------
-- FOREIGN KEYS
-------------------------------------------------------------

ALTER TABLE SanPham
ADD CONSTRAINT FK_SP_LSP
FOREIGN KEY (MaLoai)
REFERENCES LoaiSanPham(MaLoai)

ALTER TABLE GioHang
ADD CONSTRAINT FK_GH_TK
FOREIGN KEY (MaTK)
REFERENCES TaiKhoan

ALTER TABLE SanPhamNhap
ADD CONSTRAINT FK_SPN_SP
FOREIGN KEY (MaSP)
REFERENCES SanPham

ALTER TABLE SanPhamNhap
ADD CONSTRAINT FK_SPN_PNH
FOREIGN KEY (MaPhieuNhap)
REFERENCES PhieuNhapHang

ALTER TABLE PhieuNhapHang
ADD CONSTRAINT FK_PNH_NV
FOREIGN KEY (NVLapPNH)
REFERENCES NhanVien(MaNV)

ALTER TABLE HoaDon
ADD CONSTRAINT FK_HD_KH
FOREIGN KEY (MaKH)
REFERENCES KhachHang

ALTER TABLE HoaDon
ADD CONSTRAINT FK_HD_TK
FOREIGN KEY (MaTK)
REFERENCES TaiKhoan

ALTER TABLE HoaDon
ADD CONSTRAINT FK_HD_NV
FOREIGN KEY (NVLapHD)
REFERENCES NhanVien(MaNV)

ALTER TABLE SPGioHang
ADD CONSTRAINT FK_SPGH_SP
FOREIGN KEY (MaSP)
REFERENCES SanPham

ALTER TABLE SPGioHang
ADD CONSTRAINT FK_SPGH_GH 
FOREIGN KEY (MaGH)
REFERENCES GioHang

ALTER TABLE SPHoaDon
ADD CONSTRAINT FK_SPHD_SP
FOREIGN KEY (MaSP)
REFERENCES SanPham

ALTER TABLE SPHoaDon
ADD CONSTRAINT FK_SPHD_HD
FOREIGN KEY (MaHD)
REFERENCES HoaDon

