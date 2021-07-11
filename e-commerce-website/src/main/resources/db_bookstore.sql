drop table if exists category;

drop sequence if exists category_sequence;

create sequence category_sequence increment 1 start 1;

create table category (
	id int not null default nextval('category_sequence') primary key,
	name varchar(250) unique not null
);

drop table if exists product;

drop sequence if exists product_sequence;

create sequence product_sequence increment 1 start 1;

create table product (
	id int not null default nextval('product_sequence') primary key,
	name varchar(250) unique not null,
	category_id int not null,
	author varchar(100) not null,
	description text not null,
	price numeric check(price > 0) not null,
	stock int check(stock > 0) not null,
	image varchar(250),
	created_date timestamp not null,
	updated_date timestamp,
	rating decimal(10, 1) not null,
	foreign key(category_id) references category(id)
);

drop table if exists roles;

drop sequence if exists roles_sequence;

create sequence roles_sequence increment 1 start 1;

create table roles (
	id int not null default nextval('roles_sequence') primary key,
	name varchar(250) not null
);

drop table if exists customer;

drop sequence if exists customer_sequence;

create sequence customer_sequence increment 1 start 1;

create table customer (
	id int not null default nextval('customer_sequence') primary key,
	name varchar(50) not null,
	address text not null,
	email varchar(50) not null,
	role_id int not null,
	foreign key(role_id) references roles (id)
);

drop table if exists orders;

drop sequence if exists orders_sequence;

create sequence orders_sequence increment 1 start 1;

create table orders (
	id int not null default nextval('orders_sequence') primary key,
	customer_id int not null,
	total_price numeric check (total_price > 0) not null,
	order_time timestamp not null,
	foreign key(customer_id) references customer (id)
);

drop table if exists order_detail;

create table order_detail (
	id int not null,
	product_id int not null,
	stock int not null,
	primary key (id, product_id),
	foreign key(id) references orders (id),
	foreign key(product_id) references product (id)
);

drop table if exists rating;

drop sequence if exists rating_sequence;

create sequence rating_sequence increment 1 start 1;

create table rating (
	product_id int not null,
	customer_id int not null ,
	rating_point decimal(10, 1) not null,
	content varchar(250),
	primary key (product_id, customer_id),
	foreign key(product_id) references product(id),
	foreign key(customer_id) references customer(id)
);