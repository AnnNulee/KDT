CREATE TABLE customer (
	id VARCHAR(20),
	name VARCHAR(15) NOT NULL,
	age INT,
	class VARCHAR(10) NOT NULL,
	job VARCHAR(10),
	point INT DEFAULT 0,
	PRIMARY KEY (id)
);


CREATE TABLE product (
	id VARCHAR(20),
    name VARCHAR(15) NOT NULL,
    quantity INT NOT NULL,
    price INT NOT NULL,
    PRIMARY KEY (id)
);



	
    