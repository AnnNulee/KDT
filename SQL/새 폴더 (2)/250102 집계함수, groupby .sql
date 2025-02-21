SELECT * FROM 제조업체;
SELECT * FROM 주문;
SELECT * FROM 제품;

SELECT COUNT(*) FROM 고객;
SELECT COUNT(*) FROM 제조업체;
SELECT COUNT(업체명) FROM 제조업체;

SELECT COUNT(업체위치) FROM 제조업체;
SELECT MAX(수량) 최대값, MIN(수량) 최소값, SUM(수량) 합계, ROUND(AVG(수량),0) 평균 FROM 주문;

SELECT 주문고객, 수량 FROM 주문 ORDER BY 수량 ;

SELECT 주문제품, SUM(수량) AS 합계 FROM 주문 GROUP BY 주문제품;
SELECT 제조업체, SUM(재고량) FROM 제품 GROUP BY 제조업체;
SELECT 제조업체, MAX(재고량) * ROUND(AVG(단가),0) 최대재고량X평균단가 FROM 제품 GROUP BY 제조업체;

SELECT * FROM 고객;

SELECT 등급, COUNT(*) 고객수, ROUND(AVG(적립급), 0) 평균적립금 FROM 고객 GROUP BY 등급 HAVING AVG(적립급) >= 1000;


SELECT * FROM visitor_tb; 
SELECT * FROM accident;

-- 방문 경로벌 방문자 수 
SELECT VST_PATH, COUNT(distinct IP_ADDRESS) FROM visitor_tb GROUP BY VST_PATH;
-- 맞나??? 
select count(distinct ip_address) from visitor_tb where vst_path = 1;
select count(distinct ip_address) from visitor_tb where vst_path = 2;

-- 동일한 ip 에서 2번 이상 방문한 기록만 ipaddress, 방문횟수 조회
SELECT IP_ADDRESS 방문자주소, COUNT(*) 방문횟수 FROM visitor_tb GROUP BY IP_ADDRESS HAVING COUNT(*) >= 2 ORDER BY 방문횟수 DESC;

-- 날짜별 방문자 수
SELECT COUNT(distinct IP_ADDRESS), DATE(VST_TIME) FROM visitor_tb GROUP BY DATE(VST_TIME);

-- 같은날에 30번 이상 방문한 날짜와 방문자수 조회
SELECT COUNT(distinct IP_ADDRESS), DATE(VST_TIME) FROM visitor_tb GROUP BY DATE(VST_TIME) HAVING COUNT(*) >=30;

-- 방문 경로별 최다 접속한 ip를 조회
-- 방문경로별 IP
SELECT IP_ADDRESS, COUNT(IP_ADDRESS) 방문횟수 FROM visitor_tb GROUP BY IP_ADDRESS, VST_PATH HAVING VST_PATH = 1 ORDER BY 방문횟수 DESC LIMIT 1;
SELECT IP_ADDRESS, COUNT(IP_ADDRESS) 방문횟수 FROM visitor_tb GROUP BY IP_ADDRESS, VST_PATH HAVING VST_PATH = 2 ORDER BY 방문횟수 DESC LIMIT 1;


SELECT * FROM accident;

-- AREA1과 KIND별로 평균 사망자수 계산하고 평균 사망자 수가 15명 이상인 결과 조회
SELECT AVG(DIE) 평균, AREA1, KIND FROM accident GROUP BY AREA1, KIND HAVING 평균 >= 2;

-- area1 과 area2를 그룹화 하여 사망자 수가 50명 이상인 지역을 찾기
SELECT SUM(DIE) 사망자, AREA1, AREA2 FROM accident GROUP BY AREA1, AREA2 HAVING 사망자 >= 50;

-- 서울에서 발생한 사고를 사고 유형별로 집계
SELECT COUNT(*), kind, area1 FROM accident where area1 = '서울' GROUP BY KIND;
SELECT COUNT(*), kind, area1 FROM accident GROUP BY area1 having area1='서울';

-- 사망자가 2명 이상 발생한 사고만 조회
select * from accident where die>=2;


-- 주 야간별 사고건수를 집계해서 사고건수가 10건 이상인 결과 조회
select ampm, count(*) 사고건수, kind from accident group by ampm, kind having 사고건수 >=10;


