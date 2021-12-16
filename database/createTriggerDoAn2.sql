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

CREATE TRIGGER tg_TongTienMaHD_I ON HoaDon
FOR INSERT
AS
BEGIN
	UPDATE HoaDon
	SET HoaDon.TongTien = dbo.fn_TinhTongTien(HoaDon.MaHD) - HoaDon.GiaGiam
	FROM INSERTED
	WHERE HoaDon.MaHD = INSERTED.MaHD
END

CREATE TRIGGER tg_TongTienMaHD_U ON HoaDon
FOR UPDATE
AS
BEGIN
	UPDATE HoaDon
	SET HoaDon.TongTien = HoaDon.TongTien - INSERTED.GiaGiam
	FROM INSERTED
	WHERE HoaDon.MaHD = INSERTED.MaHD

	UPDATE HoaDon
	SET HoaDon.TongTien = HoaDon.TongTien + DELETED.GiaGiam
	FROM DELETED
	WHERE HoaDon.MaHD = DELETED.MaHD
END

--TRIGGER: ThanhTien SPHoaDon = (SoLuongMua * GiaBan)
CREATE TRIGGER tg_ThanhTienSPHD ON SPHoaDon
FOR INSERT, UPDATE
AS
BEGIN
	SELECT
		MaHD,
		MaSP,
		(SoLuong * GiaBan) AS ThanhTien
	INTO INSERTED_TinhThanhTien
	FROM INSERTED

	UPDATE SPHoaDon
	SET ThanhTien = SPHoaDon.SoLuong * SPHoaDon.GiaBan
	FROM INSERTED_TinhThanhTien
	WHERE SPHoaDon.MaHD = INSERTED_TinhThanhTien.MaHD AND SPHoaDon.MaSP = INSERTED_TinhThanhTien.MaSP

	UPDATE HoaDon
	SET HoaDon.TongTien = HoaDon.TongTien + INSERTED_TinhThanhTien.ThanhTien
	FROM INSERTED_TinhThanhTien
	WHERE HoaDon.MaHD = INSERTED_TinhThanhTien.MaHD

	DROP TABLE INSERTED_TinhThanhTien

	UPDATE HoaDon
	SET HoaDon.TongTien = HoaDon.TongTien - DELETED.ThanhTien
	FROM DELETED
	WHERE HoaDon.MaHD = DELETED.MaHD
END
GO