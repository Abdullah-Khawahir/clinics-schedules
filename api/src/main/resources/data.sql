INSERT INTO tbl_Hospital (
        hospital_id,
        hospital_arabic_name,
        hospital_english_name
    )
VALUES (0, 'QCH', 'ARABIC_NAME0'),
    (1, 'PMBFH', 'ARABIC_NAME1'); 

INSERT INTO tbl_building (
        building_english_name,
        building_arabic_name,
        building_number,
        hospital_id
    )
VALUES 
    ('MAIN', 'MAIN_arabic', 0, 0),
    ('OPD', 'OPD_arabic', 1, 0),
    ('RESIDENCE', 'RESIDENCE_arabic', 2, 0),
    ('MAIN', 'MAIN_arabic', 0, 1),
    ('MAIN-OPD', 'MAIN-OPD_arabic', 1, 1),
    ('STORAGE', 'STORAGE_arabic', 2, 1);
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
        employee_email,
        employee_phone_number,
        employee_second_phone_number
    )
VALUES ('husan', '0ARABIC_NAME', NULL, NULL, NULL),
    ('ali', '2ARABIC2_NAME', NULL, NULL, NULL),
    ('hasha', '5ARABI5C_NAME', NULL, NULL, NULL),
    ('ocash', '6+A65RABICa_NAME', NULL, NULL, NULL),
    ('salam', 'ARABIaC_NAME', NULL, NULL, NULL),
    ('humaid', '196ARABIaC_NAME', NULL, NULL, NULL),
    ('baker', 'A54RABIC_dsNAME', NULL, NULL, NULL);