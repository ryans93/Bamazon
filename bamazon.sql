DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INTEGER AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(50),
	department_name VARCHAR(30),
	price FLOAT,
	stock_quantity INTEGER,
	product_sales FLOAT,
	PRIMARY KEY(item_id)
);
 INSERT INTO products (product_name, department_name, price, stock_quantity)
 VALUES ("Doom", "Video Games", 49.99, 12);
 
 INSERT INTO products (product_name, department_name, price, stock_quantity)
 VALUES ("Pokemon Emerald", "Video Games", 10.99, 3);
 
 INSERT INTO products (product_name, department_name, price, stock_quantity)
 VALUES ("The Conjuring", "Movies", 39.99, 18);
 
 INSERT INTO products (product_name, department_name, price, stock_quantity)
 VALUES ("Sushi", "Food", 13.75, 53);
 
 INSERT INTO products (product_name, department_name, price, stock_quantity)
 VALUES ("Protein Powder 5 lbs", "Health/Nutrition", 72.99, 12);
 
 INSERT INTO products (product_name, department_name, price, stock_quantity)
 VALUES ("Pokemon Omega Ruby", "Video Games", 35.99, 7);
 
 INSERT INTO products (product_name, department_name, price, stock_quantity)
 VALUES ("Popcorn", "Food", 5, 107);
 
 INSERT INTO products (product_name, department_name, price, stock_quantity)
 VALUES ("Batman Mask of the Phantasm", "Movies", 8.99, 2);
 
 INSERT INTO products (product_name, department_name, price, stock_quantity)
 VALUES ("World of Warcraft", "Video Games", 69.99, 243);
  
 INSERT INTO products (product_name, department_name, price, stock_quantity)
 VALUES ("Chocolate-covered Expresso Beans 10 lbs", "Food", 44.99, 892);
 
 CREATE TABLE departments(
 	department_id INTEGER AUTO_INCREMENT NOT NULL,
 	department_name VARCHAR(30),
 	over_head_costs FLOAT,
 	PRIMARY KEY(department_id)
 );