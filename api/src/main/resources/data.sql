INSERT INTO tbl_hospital (hospital_id, name)
VALUES (0 , 'QCH'),
    (1 , 'PMBFH');
INSERT INTO tbl_building (id , building_name, building_number, hospital_id)
VALUES 
    ('MAIN', 0,         0),
    ('OPD', 1,          0),
    ('RESIDENCE', 2,    0),
    ('MAIN', 0,         1),
    ('MAIN-OPD', 1,     1),
    ('STORAGE', 2,      1);
INSERT INTO tbl_clinic (
        clinic_name,
        building_id,
        clinic_ext,
        clinic_number
    )
VALUES  ('dental', 19, null, 1),
        ('dental', 19, null, 2),
        ('dental', 19, null, 3),
        ('dental', 19, null, 4),
        ('dental', 19, null, 5),
        ('dental', 19, null, 6),
        ('dental', 19, null, 7),
        ('dental', 19, null, 8),
        ('dental', 20, null, 1),
        ('dental', 20, null, 2),
        ('dental', 20, null, 3),
        ('dental', 20, null, 4),
        ('dental', 20, null, 5),
        ('dental', 20, null, 6),
        ('dental', 20, null, 7),
        ('dental', 20, null, 8),
        ('psychiatric', 19, null, 1),
        ('psychiatric', 19, null, 2),
        ('psychiatric', 19, null, 3),
        ('psychiatric', 19, null, 4),
        ('psychiatric', 20, null, 6),
        ('psychiatric', 20, null, 7),
        ('phsycatric',  20, null, 8);
INSERT INTO tbl_clinical_employee (
        name,
        email,
        phone_number,
        second_phone_number
    )
VALUES ('husan', NULL, NULL, NULL),
    ('ali', NULL, NULL, NULL),
    ('hasha', NULL, NULL, NULL),
    ('ocash', NULL, NULL, NULL),
    ('salam', NULL, NULL, NULL),
    ('humaid', NULL, NULL, NULL),
    ('baker', NULL, NULL, NULL),
    ('fadiel', NULL, NULL, NULL),
    ('sama', NULL, NULL, NULL),
    ('zahira', NULL, NULL, NULL),
    ('zynab', NULL, NULL, NULL),
    ('foaid', NULL, NULL, NULL),
    ('nadi', NULL, NULL, NULL),
    ('mansour', NULL, NULL, NULL),
    ('abdullah', NULL, NULL, NULL),
    ('ahmed', NULL, NULL, NULL),
    ('muahmmed', NULL, NULL, NULL),
    ('zuhaier', NULL, NULL, NULL),
    ('husan', NULL, NULL, NULL),
    ('muhammed ali', NULL, NULL, NULL),
    ('muhammed hasha', NULL, NULL, NULL),
    ('muhammed ocash', NULL, NULL, NULL),
    ('muhammed salam', NULL, NULL, NULL),
    ('muhammed humaid', NULL, NULL, NULL),
    ('muhammed baker', NULL, NULL, NULL),
    ('muhammed fadiel', NULL, NULL, NULL),
    ('ali foaid', NULL, NULL, NULL),
    ('ali nadi', NULL, NULL, NULL),
    ('ali mansour', NULL, NULL, NULL),
    ('ali abdullah', NULL, NULL, NULL),
    ('ali ahmed', NULL, NULL, NULL),
    ('ali muahmmed', NULL, NULL, NULL),
    ('ali zuhaier', NULL, NULL, NULL),
    ('ali husan', NULL, NULL, NULL),
    ('sukaina ali nadi', NULL, NULL, NULL),
    ('sukaina ali mansour', NULL, NULL, NULL),
    ('sukaina ali abdullah', NULL, NULL, NULL),
    ('sukaina ali ahmed', NULL, NULL, NULL),
    ('sukaina ali muahmmed', NULL, NULL, NULL);