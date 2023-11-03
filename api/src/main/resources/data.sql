INSERT INTO tbl_Hospital (
        hospital_id,
        hospital_english_name,
        hospital_arabic_name
    )
VALUES (0, 'QCH', 'ARABIC_NAME0'),
    (1, 'PMBFH', 'ARABIC_NAME1');
INSERT INTO tbl_building (
        building_id,
        building_english_name,
        building_arabic_name,
        building_number,
        hospital_id
    )
VALUES (18, 'MAIN', 'MAIN_arabic', 0, 0),
    (19, 'OPD', 'OPD_arabic', 1, 0),
    (1010, 'RESIDENCE', 'RESIDENCE_arabic', 2, 0),
    (110, 'MAIN', 'MAIN_arabic', 0, 1),
    (20, 'MAIN-OPD', 'MAIN-OPD_arabic', 1, 1),
    (350, 'STORAGE', 'STORAGE_arabic', 2, 1);
INSERT INTO tbl_clinic (
        clinic_english_name,
        clinic_arabic_name,
        building_id,
        clinic_ext,
        clinic_number
    )
VALUES ('dental', 'dental_ARABIC', 19, null, 1),
    ('dental', 'dental_ARABIC', 19, null, 2),
    ('dental', 'dental_ARABIC', 19, null, 3),
    ('dental', 'dental_ARABIC', 19, null, 4),
    ('dental', 'dental_ARABIC', 19, null, 5),
    ('dental', 'dental_ARABIC', 19, null, 6),
    ('dental', 'dental_ARABIC', 19, null, 7),
    ('dental', 'dental_ARABIC', 19, null, 8),
    ('dental', 'dental_ARABIC', 20, null, 1),
    ('dental', 'dental_ARABIC', 20, null, 2),
    ('dental', 'dental_ARABIC', 20, null, 3),
    ('dental', 'dental_ARABIC', 20, null, 4),
    ('dental', 'dental_ARABIC', 20, null, 5),
    ('dental', 'dental_ARABIC', 20, null, 6),
    ('dental', 'dental_ARABIC', 20, null, 7),
    ('dental', 'dental_ARABIC', 20, null, 8),
    ('psychiatric', 'psychiatric_ARABIC', 19, null, 1),
    ('psychiatric', 'psychiatric_ARABIC', 19, null, 2),
    ('psychiatric', 'psychiatric_ARABIC', 19, null, 3),
    ('psychiatric', 'psychiatric_ARABIC', 19, null, 4),
    ('psychiatric', 'psychiatric_ARABIC', 20, null, 6),
    ('psychiatric', 'psychiatric_ARABIC', 20, null, 7),
    ('phsycatric', 'phsycatric_ARABIC', 20, null, 8);
INSERT INTO tbl_clinical_employee (
        employee_english_name,
        employee_arabic_name,
        employee_specialty
    )
VALUES ('husan', '0ARABIC_NAME',  NULL),
    ('ali', '2ARABIC2_NAME',  NULL),
    ('hasha', '5ARABI5C_NAME',  NULL),
    ('ocash', '6+A65RABICa_NAME',  NULL),
    ('salam', 'ARABIaC_NAME',  NULL),
    ('humaid', '196ARABIaC_NAME',  NULL),
    ('baker', 'A54RABIC_dsNAME',  NULL);
INSERT INTO tbl_clinic_schedule (
        schedule_id,
        clinic_id,
        schedule_begin_date,
        schedule_expire_date,
        event_start_time,
        event_finish_time,
        event_repeat
    )
VALUES (
        0,
        1,
        NOW(),
        '2023-12-22 11:30',
        '08:00AM',
        '01:00PM',
        'weekends'
    );
INSERT INTO tbl_schedule_employees_list (schedule_id, employee_id)
VALUES (0, 2),
    (0, 5);

INSERT INTO tbl_user (
        user_id,
        user_username,
        user_password,
        user_email
    )
VALUES (0, 'abdullah', '4484', '0aamk@gmail.com'),
    (1, 'ali', '4484', '1aamk@gmail.com'),
    (2, 'ahmed', '4484', '2aamk@gmail.com');
INSERT INTO tbl_user_roles (user_id, user_role)
VALUES (0, 'DEV'),
    (0, 'ADMIN'),
    (0, 'USER'),
    (1, 'ADMIN'),
    (1, 'USER'),
    (2, 'USER');