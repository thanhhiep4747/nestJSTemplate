Drop database if exists linh_nguyen;
create database linh_nguyen;
use  linh_nguyen;
drop table if exists products;
create table products(
pid int PRIMARY KEY,
pname nvarchar(200) not null,
pprice decimal(15,0) not null,
img nvarchar(200) not null,
detail nvarchar(4000) not null

)
drop table if exists sizes;
create table sizes(
nsize int primary key
);
drop table if exists product_size;
create table product_size(
size int,
proid int,
primary key(proid,size),
foreign key (size) REFERENCES sizes(nsize) ON DELETE CASCADE  ON UPDATE CASCADE,
foreign key (proid) REFERENCES products(pid) ON DELETE CASCADE  ON UPDATE CASCADE
)

alter table product_size ADD number int not null;
select * from products


drop procedure if exists addproduct;
go
create procedure addproduct
(@name nvarchar(200),@price decimal(15,0),@img nvarchar(200),@detail nvarchar(4000))
as begin
DECLARE @idmax int;
select @idmax=max(pid) from products;
if (@idmax=NULL)
set @idmax=0;
else
set @idmax=@idmax+1;
print @idmax 
insert into products(pid,pname,pprice,img,detail) values(@idmax,@name,@price,@img,@detail);
select @idmax as id;
end;

drop procedure if exists getProduct;
go 
create procedure getProduct
as begin
select pid,pname,pprice,img,detail,sum(product_size.number) as countproduct
from products join product_size on products.pid=product_size.proid
group by pid,pname,pprice,img,detail;
end;

drop procedure if exists getdetailproduct;
go 
create procedure getdetailproduct(@id int)
as begin 
select pid,pname,pprice,img,detail,size,number 
from products left join product_size on products.pid=product_size.proid  where pid=@id;
end;

drop procedure if exists updateProduct;
go
create  procedure updateProduct(@id int,
@name nvarchar(200),
@price decimal(15,0),
@img nvarchar(200),
@detail nvarchar(4000))
as begin 
update products 
set pname=@name,pprice=@price,img=@img,detail=@detail
where pid=@id;
select @id;
end;
go
 
drop procedure if exists updateProductSize;
go
create procedure updateProductSize(
@id int,@size int,@num int)
as begin
if exists (select * from product_size where (proid=@id and size=@size))
update product_size set number=@num where (proid=@id and size=@size);
else 
insert into product_size(size,proid,number) values(@size,@id,@num);
end;


exec addproduct 
N'Giày adidas Ultraboost x LEGO® Colors',
2500000,
N'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/6a0d6246e26a4852825dad3900baddfd_9366/gi%C3%A0y-adidas-ultraboost-x-lego-colors.jpg',
N'Chạy bộ chính là lúc để bạn chơi đùa. Với những điểm nhấn sắc màu và các khối LEGO®, 
đôi giày chạy bộ adidas hợp tác thiết kế cùng LEGO Group này sẽ cùng bạn thỏa sức chơi đùa. 
Vừa chơi đùa lại vừa thoải mái. Đừng để điều gì ảnh hưởng tới trải nghiệm vui thích của bạn. 
Đế giữa Boost êm ái nâng niu bàn chân, cùng đế ngoài bằng cao su Continental™ Better Rubber 
vừa mang đến những sải bước nhanh nhạy vừa đảm bảo khả năng tiếp đất ổn định.'
exec addproduct 
N'Giày Forum Low',
30000000,
N'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/1f2a7fdfce904958b50fad22000a088d_9366/gi%C3%A0y-forum-low.jpg',
N'Chạy bộ chính là lúc để bạn chơi đùa. Với những điểm nhấn sắc màu và các khối LEGO®, 
đôi giày chạy bộ adidas hợp tác thiết kế cùng LEGO Group này sẽ cùng bạn thỏa sức chơi đùa. 
Vừa chơi đùa lại vừa thoải mái. Đừng để điều gì ảnh hưởng tới trải nghiệm vui thích của bạn. 
Đế giữa Boost êm ái nâng niu bàn chân, cùng đế ngoài bằng cao su Continental™ Better Rubber 
vừa mang đến những sải bước nhanh nhạy vừa đảm bảo khả năng tiếp đất ổn định.'
exec addproduct 
N'Giày Đá Bóng Sân Cỏ Nhân Tạo Predator Freak.3',
30000000,
N'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/0d62d56ed23a4c4e83f6ad0a00b26bfd_9366/gi%C3%A0y-%C4%91%C3%A1-b%C3%B3ng-s%C3%A2n-c%E1%BB%8F-nh%C3%A2n-t%E1%BA%A1o-x-speedflow.4.jpg',
N'Chạy bộ chính là lúc để bạn chơi đùa. Với những điểm nhấn sắc màu và các khối LEGO®, đôi giày chạy bộ adidas hợp tác thiết kế cùng 
LEGO Group này sẽ cùng bạn thỏa sức chơi đùa. Vừa chơi đùa lại vừa thoải mái. Đừng để điều gì ảnh hưởng tới trải nghiệm vui thích của bạn. 
Đế giữa Boost êm ái nâng niu bàn chân, cùng đế ngoài bằng cao su Continental™ Better Rubber vừa mang đến những sải bước nhanh nhạy vừa đảm 
bảo khả năng tiếp đất ổn định.'
exec updateProductSize 0,24,35;
exec updateProductSize 0,23,5;
exec updateProductSize 0,25,3;
exec updateProductSize 0,40,9;
exec updateProductSize 0,45,2;
exec updateProductSize 1,24,35;
exec updateProductSize 1,23,5;
exec updateProductSize 1,25,3;
exec updateProductSize 1,40,9;
exec updateProductSize 1,45,2;
exec updateProductSize 2,34,35;
exec updateProductSize 2,33,5;
exec updateProductSize 2,25,3;
exec updateProductSize 2,43,9;
exec updateProductSize 0,50,2;