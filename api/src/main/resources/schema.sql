DROP TABLE IF EXISTS tbl_hospital cascade;
create Table tbl_hospital (
    hospital_id SERIAL PRIMARY KEY,
    hospital_arabic_name VARCHAR(255) NOT NULL UNIQUE,
    hospital_english_name VARCHAR(255) NOT NULL UNIQUE
);
DROP TABLE IF EXISTS tbl_Building cascade;
CREATE TABLE tbl_Building(
    building_id SERIAL PRIMARY KEY,
    building_arabic_name VARCHAR(255) NOT NULL,
    building_english_name VARCHAR(255) NOT NULL,
    building_number INT NOT NULL,
    hospital_id INT NOT NULL REFERENCES tbl_Hospital(hospital_id)
);
DROP TABLE IF EXISTS tbl_Clinic cascade;
CREATE TABLE tbl_Clinic(
    clinic_id SERIAL PRIMARY KEY,
    clinic_english_name VARCHAR(255) NOT NULL,
    clinic_arabic_name VARCHAR(255) NOT NULL,
    building_id INT REFERENCES tbl_Building(building_id),
    clinic_ext VARCHAR(255) NULL,
    clinic_number INT NULL
);
DROP TABLE IF EXISTS tbl_Clinical_Employee cascade;
CREATE Table tbl_Clinical_Employee(
    employee_id SERIAL PRIMARY KEY,
    employee_arabic_name VARCHAR(255) NOT NULL UNIQUE,
    employee_english_name VARCHAR(255) NOT NULL UNIQUE,
    employee_email VARCHAR(255) NULL,
    employee_phone_number VARCHAR(255) NULL,
    employee_second_phone_number VARCHAR(255) NULL
);
DROP TYPE IF EXISTS enum_time_unit cascade;
CREATE TYPE enum_time_unit as ENUM (
    'never',
    'daily',
    'weekly',
    'weekdays',
    'weekends',
    'monthly'
);
DROP TABLE IF EXISTS tbl_Clinic_Schedule cascade;
CREATE TABLE tbl_Clinic_Schedule(
    schedule_id SERIAL PRIMARY KEY,
    clinic_id INT NOT NULL REFERENCES tbl_Clinic(clinic_id),
    schedule_begin_date TIMESTAMP NOT NULL,
    schedule_expire_date TIMESTAMP NOT NULL CONSTRAINT START_TIME_MUST_BE_BEFORE_END_TIME check(schedule_begin_date < schedule_expire_date),
    event_start_time TIME NOT NULL,
    event_finish_time TIME NOT NULL CONSTRAINT EVENT_START_TIME_MUST_BE_BEFORE_END_TIME check(event_start_time < event_finish_time),
    event_repeat enum_time_unit NOT NULL
);
DROP TABLE IF EXISTS tbl_Schedule_Employees_List cascade;
CREATE Table tbl_Schedule_Employees_List(
    schedule_id INT NOT NULL REFERENCES tbl_Clinic_Schedule(schedule_id),
    employee_id INT NOT NULL REFERENCES tbl_Clinical_Employee(employee_id),
    CONSTRAINT EMPLOYEE_CAN_NOT_BE_IN_THE_SAME_SCHEDULE_MORE_THEN_ONCE UNIQUE(schedule_id, employee_id)
);
DROP TABLE IF EXISTS tbl_Event cascade;
CREATE TABLE tbl_Event(
    schedule_id INT REFERENCES tbl_Clinic_Schedule(schedule_id) NOT NULL,
    event_begin TIMESTAMP NOT NULL,
    event_finish TIMESTAMP NOT NULL CONSTRAINT START_TIME_MUST_BE_BEFORE_END_TIME check(event_begin < event_finish)
);
DROP TYPE IF EXISTS enum_role cascade;
CREATE TYPE enum_role as ENUM ('DEV', 'ADMIN', 'USER');
DROP TABLE IF EXISTS tbl_user cascade;
CREATE TABLE tbl_user(
    user_id SERIAL PRIMARY KEY,
    user_username VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE
);
DROP TABLE IF EXISTS tbl_user_roles cascade;
CREATE TABLE tbl_user_roles(
    user_id INT REFERENCES tbl_user(user_id),
    user_role enum_role NOT NULL,
    UNIQUE(user_id, user_role)
);