ALTER TABLE customer
	ADD address VARCHAR(50);
    
ALTER TABLE customer
	DROP address;

ALTER TABLE customer
	MODIFY age INT NOT NULL;

ALTER TABLE customer
	CHANGE id customer_id VARCHAR(30);
    
ALTER TABLE customer
	ADD CONSTRAINT UNIQUE (name);
    


ALTER TABLE customer
	ADD p_id VARCHAR(30);
    
ALTER TABLE customer
	DROP p_id;
    
ALTER TABLE customer	
	ADD CONSTRAINT FOREIGN KEY (p_id) REFERENCES product(id);
    
ALTER TABLE customer
	DROP CONSTRAINT customer_ibfk_1;
    
DROP TABLE product;
    
SHOW CREATE TABLE customer;


