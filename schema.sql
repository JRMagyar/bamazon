CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(255) NOT NULL,
department_name VARCHAR(255) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INTEGER(10),
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("toaster", "home and kitchen", 15.00, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("nokia phone", "electronics", 20.00, 19);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("planner", "office supplies", 19.90, 14);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("realistic stuffed isopod", "toys and games", 18.74, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("turntable", "electronics", 99.00, 27);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("giant playing cards", "toys and games", 9.95, 46);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("slow cooker", "home and kitchen", 79.95, 31);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("flat iron", "beauty", 49.99, 24);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bed sheet set", "home and kitchen", 29.70, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("fitness tracker", "sports and outdoors", 35.99, 13);

SELECT * FROM products;