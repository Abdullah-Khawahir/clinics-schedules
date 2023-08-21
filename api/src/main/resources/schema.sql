create Table tbl_Hospital (
    hospital_id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);
CREATE TABLE tbl_Building(
    building_id SERIAL PRIMARY KEY,
    building_name VARCHAR NOT NULL,
    building_number INT NOT NULL,
    hospital_id INT NOT NULL REFERENCES tbl_Hospital(id)
);
CREATE TABLE tbl_Clinic(
    clinic_id SERIAL PRIMARY KEY,
    clinic_name VARCHAR NOT NULL,
    buiding_id INT REFERENCES tbl_Building(id),
    clinic_ext VARCHAR NULL,
    clinic_number INT NULL
);
CREATE Table tbl_Clinical_Employee(
    employee_id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NULL,
    phone_number VARCHAR NULL,
    second_phone_number VARCHAR NULL
);
CREATE TYPE enum_time_unit as ENUM ('daily', 'weekly','weekdays', 'weekends' , 'monthly' , );

CREATE TABLE tbl_Clinic_Schedule(
    schedule_id SERIAL PRIMARY KEY,
    clinic_id INT NOT NULL REFERENCES tbl_Clinic(id),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL CONSTRAINT START_TIME_MUST_BE_BEFORE_END_TIME check(start_time < end_time),
    frequency INT NOT NULL CONSTRAINT MUST_HAPPEN_AT_LEAST_ONECE check (frequency > 0),
    frequency_time_unit enum_time_unit NOT NULL
);
CREATE Table tbl_Schedule_Employees_List(
    schedule_id INT NOT NULL REFERENCES tbl_ClinicSchedule(id),
    employee_id INT NOT NULL REFERENCES tbl_Clinical_Employee(id)
);
CREATE TABLE tbl_Event(
    schedule_id INT REFERENCES tbl_ClinicSchedule(id) NOT NULL,
    event_begin TIMESTAMP NOT NULL,
    event_finish TIMESTAMP NOT NULL CONSTRAINT START_TIME_MUST_BE_BEFORE_END_TIME check(event_begin < event_finish)
);