DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;
USE bamazon;

CREATE TABLE products (
	item_id INT(3) NOT NULL,
	product_name VARCHAR(50) NOT NULL,
	deptartment_name VARCHAR(50) NOT NULL,
	price INT NOT NULL,
	stock_quantity INT(6) NOT NULL,
    PRIMARY KEY (item_id)
);

ALTER TABLE products AUTO_INCREMENT=101;
SELECT * FROM products;