SELECT 고객아이디, 고객이름, 나이 FROM 고객;
SELECT * FROM 고객;



INSERT INTO 고객 (고객아이디, 고객이름, 등급)
VALUES ('CHERRY', '김경탁', 'silver'); 


CREATE TABLE 제조업체(
	업체번호 VARCHAR(10) PRIMARY KEY,
    업체명 VARCHAR(20) NOT NULL,
    업체위치 VARCHAR(10));
	

INSERT INTO 제조업체 VALUES ('C001', '오뚜기', '서울');
INSERT INTO 제조업체 VALUES ('C002', '농심', '대전');
INSERT INTO 제조업체 VALUES ('C003', '빙그레', '부산');
INSERT INTO 제조업체 VALUES ('C004', '해태', '광주');
INSERT INTO 제조업체 VALUES ('C005', 'CJ', NULL);


ALTER TABLE 제품
	DROP FOREIGN KEY 제품_ibfk_1;

ALTER TABLE 제품
	ADD CONSTRAINT 제품_ibfk_1
	FOREIGN KEY (`제조업체`)
    REFERENCES 제조업체(`업체번호`);

INSERT INTO 고객 VALUES ('apple', '정소화', 20, 'gold','학생',0,'apple@naver.com');
INSERT INTO 고객 VALUES ('banana', '김선우', 25, 'vip', '간호사', 2500,'banana@naver.com');
INSERT INTO 고객 VALUES ('carrot', '고명석', NULL, 'gold', '교사', 4500, NULL);
INSERT INTO 고객 VALUES ('orange', '김용욱', 22, 'silver', '학생', 0, 'orange@naver.com');
INSERT INTO 고객 VALUES ('melon', '성원용', 35, 'gold', '회사원', 5000, 'melon@naver.com');
INSERT INTO 고객 VALUES ('peach', '오형준', NULL, 'silver', '의사', 300, NULL);
INSERT INTO 고객 VALUES ('pear', '채광주', 31, 'silver', '회사원', NULL, 'pear@naver.com');


SET SQL_SAFE_UPDATES = 0;

DELETE FROM 제품;

SET SQL_SAFE_UPDATES = 1;


INSERT INTO 제품 VALUES ('p01', '그냥만두', 5000, 4500, 'C001');
INSERT INTO 제품 VALUES ('p02', '매운쫄면', 2500, 5500, 'C001');
INSERT INTO 제품 VALUES ('p03', '쿵떡파이', 3600, 2600, 'C002');
INSERT INTO 제품 VALUES ('p04', '맛난초콜렛', 1250, 2500, 'C003');
INSERT INTO 제품 VALUES ('p05', '얼큰라면', 2200, 1200, 'C004');
INSERT INTO 제품 VALUES ('p06', '통통우동', 1000, 1550, 'C005');
INSERT INTO 제품 VALUES ('p07', '달콤비스켓', 1650, 1500, 'C005');

DROP TABLE 주문;

CREATE TABLE 주문 (
	주문번호 CHAR(10) PRIMARY KEY,
    주문고객 VARCHAR(10) NOT NULL,
    주문제품 VARCHAR(10) NOT NULL,
    수량 INT DEFAULT 0,
    배송지 VARCHAR(100),
    주문일자 DATETIME,
    FOREIGN KEY (주문고객) REFERENCES 고객(고객아이디),
    FOREIGN KEY (주문제품) REFERENCES 제품(제품번호));

INSERT INTO 주문 VALUES ('o01', 'apple', 'p03', 10, '서울시 마포구', '2013-01-01');
INSERT INTO 주문 VALUES ('o02', 'melon', 'p01', 5, '인천시 계양구', '2013-01-10');
INSERT INTO 주문 VALUES ('o03', 'banana', 'p06', 45, '경기도 부천시', '2013-01-11');
INSERT INTO 주문 VALUES ('o04', 'carrot', 'p02', 8, '부산시 금정구', '2013-02-01');
INSERT INTO 주문 VALUES ('o05', 'melon', 'p06', 36, '경기도 용인시', '2013-02-20');
INSERT INTO 주문 VALUES ('o06', 'banana', 'p01', 19, '충청북도 보은군', '2013-03-02');
INSERT INTO 주문 VALUES ('o07', 'apple', 'p03', 22, '서울시 영등포구', '2013-03-15');
INSERT INTO 주문 VALUES ('o08', 'pear', 'p02', 50, '강원도 춘천시', '2013-04-10');
INSERT INTO 주문 VALUES ('o09', 'banana', 'p04', 15, '전라남도 목포시', '2013-04-11');
INSERT INTO 주문 VALUES ('o10', 'carrot', 'p03', 20, '경기도 안양시', '2013-05-22');


SELECT * FROM 제품 WHERE 제품번호='p03';
INSERT INTO 주문 VALUES ('o01', 'apple', 'p03', 10, '서울시 마포구', '2013-01-01');

SHOW CREATE TABLE 주문;

SELECT * FROM 고객 WHERE 고객아이디 = 'apple';


INSERT INTO 주문 (주문번호, 주문고객, 주문제품, 수량, 배송지, 주문일자)
VALUES ('o01', 'apple', 'p03', 10, '서울시 마포구', '2013-01-01');







