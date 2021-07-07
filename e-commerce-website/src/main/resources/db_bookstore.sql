drop table if exists author cascade;

drop sequence if exists author_sequence;

create sequence author_sequence increment 1 start 1;

create table author (
	id int not null default nextval('author_sequence') primary key,
	name varchar(250) not null,
	country varchar(250)
);

drop table if exists category cascade;

drop sequence if exists category_sequence;

create sequence category_sequence increment 1 start 1;

create table category (
	id int not null default nextval('category_sequence') primary key,
	name varchar(250) not null
);

drop table if exists product cascade;

drop sequence if exists product_sequence;

create sequence product_sequence increment 1 start 1;

create table product (
	id int not null default nextval('product_sequence') primary key,
	name varchar(250) not null,
	category_id int references category (id),
	author_id int references author (id),
	description text not null,
	price numeric check(price > 0) not null,
	stock int check(stock > 0) not null,
	image varchar(250),
	created_date timestamp not null,
	updated_date timestamp,
	rating decimal(10, 1)
);

drop table if exists roles cascade;

drop sequence if exists roles_sequence;

create sequence roles_sequence increment 1 start 1;

create table roles (
	id int not null default nextval('roles_sequence') primary key,
	name varchar(250) not null
);

drop table if exists customer cascade;

drop sequence if exists customer_sequence;

create sequence customer_sequence increment 1 start 1;

create table customer (
	id int not null default nextval('customer_sequence') primary key,
	name varchar(50) not null,
	address text not null,
	email varchar(50) not null,
	role_id int references roles (id)
);

drop table if exists orders cascade;

drop sequence if exists orders_sequence;

create sequence orders_sequence increment 1 start 1;

create table orders (
	id int not null default nextval('orders_sequence') primary key,
	customer_id int references customer (id) not null,
	total_price numeric check (total_price > 0),
	order_time timestamp not null
);

drop table if exists order_detail;

create table order_detail (
	id int references orders (id) not null,
	product_id int not null references product (id),
	stock int not null,
	primary key (id, product_id)
);

drop table if exists rating;

drop sequence if exists rating_sequence;

create sequence rating_sequence increment 1 start 1;

create table rating (
	product_id int references product (id) not null,
	customer_id int references customer (id) not null ,
	rating_point decimal(10, 1) not null,
	content varchar(250),
	primary key (product_id, customer_id)
);