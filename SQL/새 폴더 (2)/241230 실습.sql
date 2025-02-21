CREATE TABLE SCHOOL (
	NUM INT,
    NAME VARCHAR(50),
    AREA VARCHAR(50),
    COURSE_CNT INT,
    C_DATE DATETIME,
    PRIMARY KEY(NUM)
);

CREATE TABLE COURSE01 (
	NUM INT,
    SCHOOL_NUM INT,
    NAME VARCHAR(15),
    STUDENT_CNT INT,
    C_DATE DATETIME,
    PRIMARY KEY(NUM),
    FOREIGN KEY (SCHOOL_NUM) REFERENCES SCHOOL(NUM) ON DELETE SET NULL
);