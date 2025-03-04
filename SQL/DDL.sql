CREATE TABLE 고객(
고객아이디 VARCHAR(10),
고객이름 VARCHAR(10) NOT NULL,
나이 INT,
등급 VARCHAR(10) NOT NULL,
직업 VARCHAR(10),
적립급 INT DEFAULT 0,
PRIMARY KEY(고객아이디)
);

CREATE TABLE 제품(
제품번호 CHAR(10) PRIMARY kEY,
제품명 VARCHAR(100) NOT NULL,
재고량 INT DEFAULT 0,
단가 INT NOT NULL,
제조업체 VARCHAR(20),
FOREIGN KEY(제조업체) REFERENCES 고객(고객아이디) ON DELETE SET NULL
);

CREATE TABLE 제조업체(
	업체번호 VARCHAR(20) PRIMARY KEY,
    업체명 VARCHAR(20) NOT NULL,
    업체위치 VARCHAR(10)
    );
    
DROP TABLE 제조업체;

ALTER TABLE 제품
	DROP FOREIGN KEY 제품_ibfk_1;

ALTER TABLE 제품 
	ADD CONSTRAINT 제품_ibfk_1
	FOREIGN KEY(`제조업체`)
    REFERENCES 제조업체(`업체번호`);

CREATE TABLE 주문(
주문번호 CHAR(10) PRIMARY KEY,
주문고객 VARCHAR(20) NOT NULL,
주문제품 CHAR(10) NOT NULL,
수량 INT DEFAULT 1,
배송지 VARCHAR(100),
주문일자 DATETIME,
FOREIGN KEY(주문고객) REFERENCES 고객(고객아이디),
FOREIGN KEY(주문제품) REFERENCES 제품(제품번호)
);

ALTER TABLE 고객
	ADD 이메일 VARCHAR(100);
    
DROP TABLE 주문;

DROP TABLE 고객;