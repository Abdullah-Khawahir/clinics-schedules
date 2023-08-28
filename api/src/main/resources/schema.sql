DROP TABLE IF EXISTS tbl_Hospital;
create Table tbl_Hospital (
    hospital_id SERIAL PRIMARY KEY,
    hospital_arabic_name VARCHAR(255) NOT NULL UNIQUE,
    hospital_english_name VARCHAR(255) NOT NULL UNIQUE,
);
DROP TABLE IF EXISTS tbl_Building;
CREATE TABLE tbl_Building(
    building_id SERIAL PRIMARY KEY,
    building_arabic_name VARCHAR(255) NOT NULL,
    building_english_name VARCHAR(255) NOT NULL,
    building_number INT NOT NULL,
    hospital_id INT NOT NULL REFERENCES tbl_Hospital(hospital_id)
);
DROP TABLE IF EXISTS tbl_Clinic;
CREATE TABLE tbl_Clinic(
    clinic_id SERIAL PRIMARY KEY,
    clinic_english_name VARCHAR(255) NOT NULL,
    clinic_arabic_name VARCHAR(255) NOT NULL,
    building_id INT REFERENCES tbl_Building(building_id),
    clinic_ext VARCHAR(255) NULL,
    clinic_number INT NULL
);
DROP TABLE IF EXISTS tbl_Clinical_Employee;
CREATE Table tbl_Clinical_Employee(
    employee_id SERIAL PRIMARY KEY,
    employee_arabic_name VARCHAR(255) NOT NULL UNIQUE,
    employee_english_name VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NULL,
    phone_number VARCHAR(255) NULL,
    second_phone_number VARCHAR(255) NULL
);
DROP TYPE IF EXISTS enum_time_unit;
CREATE TYPE enum_time_unit as ENUM (
    'never',
    'daily',
    'weekly',
    'weekdays',
    'weekends',
    'monthly'
);
DROP TABLE IF EXISTS tbl_Clinic_Schedule;
CREATE TABLE tbl_Clinic_Schedule(
    schedule_id SERIAL PRIMARY KEY,
    clinic_id INT NOT NULL REFERENCES tbl_Clinic(clinic_id),
    schedule_begin_time TIMESTAMP NOT NULL,
    schedule_expire_time TIMESTAMP NOT NULL CONSTRAINT START_TIME_MUST_BE_BEFORE_END_TIME check(start_time < end_time),
    event_start_time TIMESTAMP NOT NULL,
    event_finish_time TIMESTAMP NOT NULL CONSTRAINT START_TIME_MUST_BE_BEFORE_END_TIME check(start_time < end_time),
    event_repeat enum_time_unit NOT NULL
);
DROP TABLE IF EXISTS tbl_Schedule_Employees_List;

CREATE Table tbl_Schedule_Employees_List(
    schedule_id INT NOT NULL REFERENCES tbl_Clinic_Schedule(schedule_id),
    employee_id INT NOT NULL REFERENCES tbl_Clinical_Employee(employee_id) ,
    CONSTRAINT EMPLOYEE_CAN_NOT_BE_IN_THE_SAME_SCHEDULE_MORE_THEN_ONCE UNIQUE(schedule_id , employee_id)
);

DROP TABLE IF EXISTS tbl_Event;
CREATE TABLE tbl_Event(
    schedule_id INT REFERENCES tbl_Clinic_Schedule(schedule_id) NOT NULL,
    event_begin TIMESTAMP NOT NULL,
    event_finish TIMESTAMP NOT NULL CONSTRAINT START_TIME_MUST_BE_BEFORE_END_TIME check(event_begin < event_finish)
);
DROP TYPE IF EXISTS enum_role;
CREATE TYPE enum_role as ENUM ('DEV', 'ADMIN', 'USER');
DROP TABLE IF EXISTS tbl_user;
CREATE TABLE tbl_user(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL ,
    email VARCHAR(255) NOT NULL UNIQUE
);
DROP TABLE IF EXISTS tbl_user_roles;
CREATE TABLE tbl_user_roles(
    user_id REFERENCES tbl_user(user_id),
    user_role enum_role NOT NULL ,
    UNIQUE(user_id , user_role );
);