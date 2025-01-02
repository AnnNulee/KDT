CREATE TABLE 고객(
	고객아이디 VARCHAR(10),
    고객이름 VARCHAR(10) NOT NULL,
    나이 INT,
    등급 VARCHAR(10) NOT NULL,
    직업 VARCHAR(10),
    적립금 INT DEFAULT 0,
    PRIMARY KEY(고객아이디));
    
CREATE TABLE 제품(
	제품번호 CHAR(10) PRIMARY KEY,
    제품명 VARCHAR(100) NOT NULL,
    재고량 INT DEFAULT 0,
    단가 INT NOT NULL,
    제조업체 VARCHAR(20),
    FOREIGN KEY (제조업체) REFERENCES 고객(고객아이디) ON DELETE SET NULL);    


CREATE TABLE 주문 (
	주문번호 CHAR(10) PRIMARY KEY,
    주문고객 VARCHAR(20) NOT NULL,
    주문제품 VARCHAR(10) NOT NULL,
    수량 INT DEFAULT 0,
    배송지 VARCHAR(100),
    주문일자 DATETIME,
    FOREIGN KEY (주문고객) REFERENCES 고객(고객아이디),
    FOREIGN KEY (주문제품) REFERENCES 제품(제품번호));


ALTER TABLE 고객
	ADD 이메일 VARCHAR(100);

DROP TABLE 주문;

