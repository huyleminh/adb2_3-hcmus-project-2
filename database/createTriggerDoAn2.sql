USE QUAN_LI_BAN_HANG_DO_AN_2
GO

CREATE FUNCTION fn_TinhTongTien (@MaHD INT)
RETURNS INT
AS
BEGIN
    DECLARE @TongTien INT
    SET @TongTien = (SELECT SUM(ThanhTien) FROM SPHoaDon WHERE MaHD = @MaHD)

    IF @TongTien IS NULL
        SET @TongTien = 0

    RETURN @TongTien
END
GO

--TRIGGER: TongTien(MaHD) = SUM(ThanhTien) SPHoaDon(MaHD) - GiaGiam
CREATE TRIGGER tg_TongTienSPHD_D ON SPHoaDon
FOR DELETE
AS
BEGIN
	UPDATE HoaDon
	SET HoaDon.TongTien = HoaDon.TongTien - DELETED.ThanhTien
	FROM DELETED
	WHERE HoaDon.MaHD = deleted.MaHD
END
GO

CREATE TRIGGER tg_TongTienMaHD_I ON HoaDon
FOR INSERT
AS
BEGIN
	UPDATE HoaDon
	SET HoaDon.TongTien = dbo.fn_TinhTongTien(HoaDon.MaHD) - HoaDon.GiaGiam
	FROM INSERTED
	WHERE HoaDon.MaHD = INSERTED.MaHD
END
GO

CREATE TRIGGER tg_TongTienMaHD_U ON HoaDon
FOR UPDATE
AS
BEGIN
	UPDATE HoaDon
	SET HoaDon.TongTien = HoaDon.TongTien + INSERTED.GiaGiam
	FROM INSERTED
	WHERE HoaDon.MaHD = INSERTED.MaHD

	UPDATE HoaDon
	SET HoaDon.TongTien = HoaDon.TongTien - DELETED.GiaGiam
	FROM DELETED
	WHERE HoaDon.MaHD = DELETED.MaHD
END
GO

--TRIGGER: ThanhTien SPHoaDon = (SoLuongMua * GiaBan)
CREATE TRIGGER tg_ThanhTienSPHD ON SPHoaDon
FOR INSERT, UPDATE
AS
BEGIN
	SELECT
		MaHD,
		MaSP,
		(SoLuongMua * GiaBan) AS ThanhTien
	INTO INSERTED_TinhThanhTien
	FROM INSERTED
	select * from INSERTED_TinhThanhTien

	UPDATE SPHoaDon
	SET ThanhTien = INSERTED_TinhThanhTien.ThanhTien
	FROM INSERTED_TinhThanhTien
	WHERE SPHoaDon.MaHD = INSERTED_TinhThanhTien.MaHD AND SPHoaDon.MaSP = INSERTED_TinhThanhTien.MaSP

	UPDATE HoaDon
	SET HoaDon.TongTien = dbo.fn_TinhTongTien(HoaDon.MaHD) - HoaDon.GiaGiam
	FROM INSERTED_TinhThanhTien
	WHERE HoaDon.MaHD = INSERTED_TinhThanhTien.MaHD

	DROP TABLE INSERTED_TinhThanhTien
END
GO