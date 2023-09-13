DROP TABLE IF EXISTS tbl_hospital cascade;
create Table tbl_hospital (
    hospital_id SERIAL PRIMARY KEY,
    hospital_arabic_name VARCHAR(255) NOT NULL CONSTRAINT HOSPITAL_ARABIC_NAME_ALREADY_EXISTS UNIQUE,
    hospital_english_name VARCHAR(255) NOT NULL CONSTRAINT HOSPITAL_ENGLISH_NAME_ALREADY_EXISTS UNIQUE
);
DROP TABLE IF EXISTS tbl_Building cascade;
CREATE TABLE tbl_Building(
    building_id SERIAL PRIMARY KEY,
    building_arabic_name VARCHAR(255) NOT NULL,
    building_english_name VARCHAR(255) NOT NULL,
    building_number INT NOT NULL,
    hospital_id INT NOT NULL REFERENCES tbl_Hospital(hospital_id),
    CONSTRAINT BUILDING_ARABIC_NAME_ALREADY_EXISTS_IN_THE_SAME_HOSPITAL UNIQUE(hospital_id, building_arabic_name),
    CONSTRAINT BUILDING_ENGLISH_NAME_ALREADY_EXISTS_IN_THE_SAME_HOSPITAL UNIQUE(hospital_id, building_english_name)
);
DROP TABLE IF EXISTS tbl_Clinic cascade;
CREATE TABLE tbl_Clinic(
    clinic_id SERIAL PRIMARY KEY,
    clinic_english_name VARCHAR(255) NOT NULL,
    clinic_arabic_name VARCHAR(255) NOT NULL,
    building_id INT NOT NULL REFERENCES tbl_Building(building_id),
    clinic_ext VARCHAR(255) NULL,
    clinic_number INT NULL,
    CONSTRAINT CLINIC_MUST_BE_UNIQUE_IN_EVERY_BUILDING UNIQUE(
        building_id,
        clinic_english_name,
        clinic_arabic_name,
        clinic_number
    )
);
DROP TABLE IF EXISTS tbl_Clinical_Employee cascade;
CREATE Table tbl_Clinical_Employee(
    employee_id SERIAL PRIMARY KEY,
    employee_arabic_name VARCHAR(255) NOT NULL CONSTRAINT EMPLOYEE_ARABIC_NAME_ALREADY_EXISTS UNIQUE,
    employee_english_name VARCHAR(255) NOT NULL CONSTRAINT EMPLOYEE_ENGLISH_NAM_ALREADY_EXISTS UNIQUE,
    employee_email VARCHAR(255) NULL,
    employee_phone_number VARCHAR(255) NULL,
    employee_second_phone_number VARCHAR(255) NULL
);

DROP TABLE IF EXISTS tbl_Clinic_Schedule cascade;
CREATE TABLE tbl_Clinic_Schedule(
    schedule_id SERIAL PRIMARY KEY,
    clinic_id INT NOT NULL REFERENCES tbl_Clinic(clinic_id),
    schedule_begin_date TIMESTAMP NOT NULL,
    schedule_expire_date TIMESTAMP NOT NULL CONSTRAINT START_TIME_MUST_BE_BEFORE_END_TIME check(schedule_begin_date < schedule_expire_date),
    event_start_time TIME NOT NULL,
    event_finish_time TIME NOT NULL CONSTRAINT EVENT_START_TIME_MUST_BE_BEFORE_END_TIME check(event_start_time < event_finish_time),
    event_repeat VARCHAR(255) NOT NULL check(
        event_repeat = 'never'
        OR event_repeat = 'daily'
        OR event_repeat = 'weekly'
        OR event_repeat = 'weekdays'
        OR event_repeat = 'weekends'
        OR event_repeat = 'monthly'
    )
);
DROP TABLE IF EXISTS tbl_Schedule_Employees_List cascade;
CREATE Table tbl_Schedule_Employees_List(
    schedule_id INT NOT NULL REFERENCES tbl_Clinic_Schedule(schedule_id),
    employee_id INT NOT NULL REFERENCES tbl_Clinical_Employee(employee_id),
    CONSTRAINT EMPLOYEE_CAN_NOT_BE_IN_THE_SAME_SCHEDULE_MORE_THEN_ONCE UNIQUE(schedule_id, employee_id)
);
DROP TABLE IF EXISTS tbl_Event cascade;
CREATE TABLE tbl_Event(
    event_id SERIAL PRIMARY KEY,
    schedule_id INT REFERENCES tbl_Clinic_Schedule(schedule_id),
    event_begin TIMESTAMP NOT NULL,
    event_finish TIMESTAMP NOT NULL CONSTRAINT START_TIME_MUST_BE_BEFORE_END_TIME check(event_begin < event_finish)
);
DROP TABLE IF EXISTS tbl_user cascade;
CREATE TABLE tbl_user(
    user_id SERIAL PRIMARY KEY,
    user_username VARCHAR(255) NOT NULL CONSTRAINT USERNAME_ALREADY_EXISTS UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL CONSTRAINT EMAIL_ALREADY_EXISTS UNIQUE
);
DROP TABLE IF EXISTS tbl_user_roles cascade;
CREATE TABLE tbl_user_roles(
    user_id INT REFERENCES tbl_user(user_id),
    user_role VARCHAR NOT NULL check(
        user_role = 'DEV'
        OR user_role = 'ADMIN'
        OR user_role = 'USER'
    ),
    CONSTRAINT USER_CAN_ONLY_HAVE_THE_ROLE_ONCE UNIQUE(user_id, user_role)
);