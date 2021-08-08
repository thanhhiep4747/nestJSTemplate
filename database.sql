USE [master]
GO
/****** Object:  Database [sonnguyen]    Script Date: 8/9/2021 2:18:24 AM ******/
CREATE DATABASE [sonnguyen]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'TaskSonNguyen', FILENAME = N'D:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\TaskSonNguyen.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'TaskSonNguyen_log', FILENAME = N'D:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\TaskSonNguyen_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [sonnguyen] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [sonnguyen].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [sonnguyen] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [sonnguyen] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [sonnguyen] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [sonnguyen] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [sonnguyen] SET ARITHABORT OFF 
GO
ALTER DATABASE [sonnguyen] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [sonnguyen] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [sonnguyen] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [sonnguyen] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [sonnguyen] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [sonnguyen] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [sonnguyen] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [sonnguyen] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [sonnguyen] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [sonnguyen] SET  DISABLE_BROKER 
GO
ALTER DATABASE [sonnguyen] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [sonnguyen] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [sonnguyen] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [sonnguyen] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [sonnguyen] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [sonnguyen] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [sonnguyen] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [sonnguyen] SET RECOVERY FULL 
GO
ALTER DATABASE [sonnguyen] SET  MULTI_USER 
GO
ALTER DATABASE [sonnguyen] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [sonnguyen] SET DB_CHAINING OFF 
GO
ALTER DATABASE [sonnguyen] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [sonnguyen] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [sonnguyen] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [sonnguyen] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'sonnguyen', N'ON'
GO
ALTER DATABASE [sonnguyen] SET QUERY_STORE = OFF
GO
USE [sonnguyen]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 8/9/2021 2:18:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[id] [int] NOT NULL,
	[value] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 8/9/2021 2:18:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](100) NOT NULL,
	[price] [numeric](18, 0) NOT NULL,
	[category] [int] NOT NULL,
	[imageUrl] [nchar](300) NOT NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product_Size]    Script Date: 8/9/2021 2:18:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product_Size](
	[productId] [int] NOT NULL,
	[sizeId] [int] NOT NULL,
	[quantity] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Size]    Script Date: 8/9/2021 2:18:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Size](
	[id] [int] NOT NULL,
	[value] [nchar](10) NOT NULL,
 CONSTRAINT [PK_Size] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[Category] ([id], [value]) VALUES (1, N'Nam Chạy')
INSERT [dbo].[Category] ([id], [value]) VALUES (2, N'Originals')
INSERT [dbo].[Category] ([id], [value]) VALUES (3, N'Nam Originals')
INSERT [dbo].[Category] ([id], [value]) VALUES (4, N'Colors')
INSERT [dbo].[Category] ([id], [value]) VALUES (5, N'Đánh gôn')
GO
SET IDENTITY_INSERT [dbo].[Product] ON 

INSERT [dbo].[Product] ([id], [name], [price], [category], [imageUrl]) VALUES (1, N'Giày adidas Ultraboost x LEGO® Colors', CAST(2500000 AS Numeric(18, 0)), 1, N'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/6a0d6246e26a4852825dad3900baddfd_9366/Giay_adidas_Ultraboost_x_LEGO(r)_Colors_trang_FZ3983_01_standard.jpg                                                                                                            ')
INSERT [dbo].[Product] ([id], [name], [price], [category], [imageUrl]) VALUES (2, N'Giày adidas Superstar x LEGO®', CAST(3500000 AS Numeric(18, 0)), 2, N'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/3c4067b13da442efba23ad1e01567a30_9366/Giay_adidas_Superstar_x_LEGO(r)_trang_GW5270_01_standard.jpg                                                                                                                    ')
INSERT [dbo].[Product] ([id], [name], [price], [category], [imageUrl]) VALUES (3, N'Giày Forum Low', CAST(5000000 AS Numeric(18, 0)), 3, N'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/1f2a7fdfce904958b50fad22000a088d_9366/gi%C3%A0y-forum-low.jpg                                                                                                                                                   ')
INSERT [dbo].[Product] ([id], [name], [price], [category], [imageUrl]) VALUES (7, N'Product is updated', CAST(20000000 AS Numeric(18, 0)), 4, N'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/c6f85564b31448948aa0ac5c01091fa1_9366/Giay_golf_djinh_lien_S2G_BOA_trang_FW6312_01_standard.jpg                                                                                                                       ')
INSERT [dbo].[Product] ([id], [name], [price], [category], [imageUrl]) VALUES (8, N'Dép adilette Comfort', CAST(200000 AS Numeric(18, 0)), 2, N'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/5f3e4777644e4b7890e7ac93012e44be_9366/Dep_adilette_Comfort_DJen_FZ1701_01_standard.jpg                                                                                                                                ')
SET IDENTITY_INSERT [dbo].[Product] OFF
GO
INSERT [dbo].[Product_Size] ([productId], [sizeId], [quantity]) VALUES (1, 1, 1)
INSERT [dbo].[Product_Size] ([productId], [sizeId], [quantity]) VALUES (1, 2, 1)
INSERT [dbo].[Product_Size] ([productId], [sizeId], [quantity]) VALUES (1, 3, 1)
INSERT [dbo].[Product_Size] ([productId], [sizeId], [quantity]) VALUES (1, 4, 4)
INSERT [dbo].[Product_Size] ([productId], [sizeId], [quantity]) VALUES (2, 1, 2)
INSERT [dbo].[Product_Size] ([productId], [sizeId], [quantity]) VALUES (8, 3, 1)
INSERT [dbo].[Product_Size] ([productId], [sizeId], [quantity]) VALUES (8, 4, 1)
INSERT [dbo].[Product_Size] ([productId], [sizeId], [quantity]) VALUES (8, 5, 1)
INSERT [dbo].[Product_Size] ([productId], [sizeId], [quantity]) VALUES (8, 6, 1)
INSERT [dbo].[Product_Size] ([productId], [sizeId], [quantity]) VALUES (7, 1, 1)
INSERT [dbo].[Product_Size] ([productId], [sizeId], [quantity]) VALUES (7, 2, 1)
INSERT [dbo].[Product_Size] ([productId], [sizeId], [quantity]) VALUES (7, 3, 1)
INSERT [dbo].[Product_Size] ([productId], [sizeId], [quantity]) VALUES (7, 4, 1)
INSERT [dbo].[Product_Size] ([productId], [sizeId], [quantity]) VALUES (7, 5, 1)
INSERT [dbo].[Product_Size] ([productId], [sizeId], [quantity]) VALUES (7, 7, 1)
INSERT [dbo].[Product_Size] ([productId], [sizeId], [quantity]) VALUES (7, 8, 1)
GO
INSERT [dbo].[Size] ([id], [value]) VALUES (1, N'3.5 UK    ')
INSERT [dbo].[Size] ([id], [value]) VALUES (2, N'4 UK      ')
INSERT [dbo].[Size] ([id], [value]) VALUES (3, N'4.5 UK    ')
INSERT [dbo].[Size] ([id], [value]) VALUES (4, N'5 UK      ')
INSERT [dbo].[Size] ([id], [value]) VALUES (5, N'5.5 UK    ')
INSERT [dbo].[Size] ([id], [value]) VALUES (6, N'6 UK      ')
INSERT [dbo].[Size] ([id], [value]) VALUES (7, N'6.5 UK    ')
INSERT [dbo].[Size] ([id], [value]) VALUES (8, N'7 UK      ')
GO
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_Category] FOREIGN KEY([category])
REFERENCES [dbo].[Category] ([id])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_Category]
GO
ALTER TABLE [dbo].[Product_Size]  WITH CHECK ADD  CONSTRAINT [FK_Product_Size_Product] FOREIGN KEY([productId])
REFERENCES [dbo].[Product] ([id])
GO
ALTER TABLE [dbo].[Product_Size] CHECK CONSTRAINT [FK_Product_Size_Product]
GO
ALTER TABLE [dbo].[Product_Size]  WITH CHECK ADD  CONSTRAINT [FK_Product_Size_Size] FOREIGN KEY([sizeId])
REFERENCES [dbo].[Size] ([id])
GO
ALTER TABLE [dbo].[Product_Size] CHECK CONSTRAINT [FK_Product_Size_Size]
GO
USE [master]
GO
ALTER DATABASE [sonnguyen] SET  READ_WRITE 
GO
