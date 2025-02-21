SELECT * FROM sqldb.제품;

-- OO라면, 라면OO, 라면 
SELECT * FROM 제품 WHERE 제품명 LIKE '%라면%'; 

SELECT * FROM 제품 WHERE 제품명 LIKE '__라면';

-- 고객중에 김씨성을 갖은 사람들의 직업 찾기
SELECT 직업 FROM 고객 WHERE 고객이름 LIKE '김%';

-- 고객의 직업이 두글자인 사람의 이름과 직업 나이 찾기
SELECT 고객이름, 직업, 나이 FROM 고객 WHERE char_length(직업) <= 2 ; 

-- 고객의 아이디가 pea로 시작하고 h로 끝나는 고객의 이름
SELECT 고객이름 FROM 고객 WHERE 고객아이디 LIKE 'pea%h';


-- 주문한 고객들의 목록
SELECT DISTINCT 주문고객 FROM 주문; 

SELECT * FROM 고객;
--  나이순으로 정렬(오름차순)
SELECT * FROM 고객 ORDER BY 나이 ASC;
-- 나이순으로 정렬 내림차순
SELECT * FROM 고객 ORDER BY 나이 DESC;



