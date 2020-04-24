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
 INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
 VALUES ("Doom", "Video Games", 49.99, 12, 0);
 
 INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
 VALUES ("Pokemon Emerald", "Video Games", 10.99, 3, 0);
 
 INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
 VALUES ("The Conjuring", "Movies", 39.99, 18, 0);
 
 INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
 VALUES ("Sushi", "Food", 13.75, 53, 0);
 
 INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
 VALUES ("Protein Powder 5 lbs", "Health/Nutrition", 72.99, 12, 0);
 
 INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
 VALUES ("Pokemon Omega Ruby", "Video Games", 35.99, 7, 0);
 
 INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
 VALUES ("Popcorn", "Food", 5, 107, 0);
 
 INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
 VALUES ("Batman Mask of the Phantasm", "Movies", 8.99, 2, 0);
 
 INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
 VALUES ("World of Warcraft", "Video Games", 69.99, 243, 0);
  
 INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
 VALUES ("Chocolate-covered Expresso Beans 10 lbs", "Food", 44.99, 892, 0);
 
 CREATE TABLE departments(
 	department_id INTEGER AUTO_INCREMENT NOT NULL,
 	department_name VARCHAR(30),
 	over_head_costs FLOAT,
 	PRIMARY KEY(department_id)
 );

 INSERT INTO departments (department_name, over_head_costs)
 VALUES ("Food", 6500);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Video Games", 12000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Movies", 5000);

 INSERT INTO departments (department_name, over_head_costs)
 VALUES ("Health/Nutrition", 8500);