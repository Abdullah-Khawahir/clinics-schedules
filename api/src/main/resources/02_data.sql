-- =====================================================
-- HOSPITALS
-- =====================================================

INSERT INTO tbl_hospital (
    hospital_id,
    hospital_english_name
)
VALUES
    (1, 'King Fahad Medical Center'),
    (2, 'Dammam General Hospital');

-- =====================================================
-- BUILDINGS
-- =====================================================

INSERT INTO tbl_building (
    building_id,
    building_number,
    hospital_id,
    building_english_name
)
VALUES
    (1, 100, 1, 'Main Building'),
    (2, 200, 1, 'Outpatient Building'),
    (3, 100, 2, 'Emergency Building'),
    (4, 200, 2, 'Specialty Center');

-- =====================================================
-- CLINICS
-- =====================================================

INSERT INTO tbl_clinic (
    clinic_id,
    building_id,
    clinic_number,
    clinic_english_name,
    clinic_ext,
    clinic_note
)
VALUES
    (1, 1, 101, 'Cardiology Clinic', '1101', 'Heart specialists'),
    (2, 1, 102, 'Neurology Clinic', '1102', 'Brain and nervous system'),
    (3, 2, 201, 'Dermatology Clinic', '1201', NULL),
    (4, 2, 202, 'Pediatrics Clinic', '1202', 'Children care'),
    (5, 3, 301, 'Emergency Clinic A', '1301', '24 hour service'),
    (6, 3, 302, 'Emergency Clinic B', '1302', 'Overflow emergency unit'),
    (7, 4, 401, 'Orthopedics Clinic', '1401', 'Bone specialists'),
    (8, 4, 402, 'ENT Clinic', '1402', 'Ear Nose Throat');

-- =====================================================
-- EMPLOYEES
-- =====================================================

INSERT INTO tbl_clinical_employee (
    employee_id,
    employee_english_name,
    employee_specialty
)
VALUES
    (1, 'Dr. Ahmed AlQahtani', 'Cardiology'),
    (2, 'Dr. Sarah AlHarbi', 'Neurology'),
    (3, 'Dr. Mohammed AlOtaibi', 'Dermatology'),
    (4, 'Dr. Rana AlDosari', 'Pediatrics'),
    (5, 'Dr. Faisal AlShammari', 'Emergency Medicine'),
    (6, 'Dr. Abdullah AlMutairi', 'Emergency Medicine'),
    (7, 'Dr. Noura AlZahrani', 'Orthopedics'),
    (8, 'Dr. Khalid AlEnezi', 'ENT'),
    (9, 'Nurse Mona Hassan', 'Nursing'),
    (10, 'Nurse Omar Salem', 'Nursing');

-- =====================================================
-- CLINIC SCHEDULES
-- =====================================================

INSERT INTO tbl_clinic_schedule (
    schedule_id,
    clinic_id,
    schedule_begin_date,
    schedule_expire_date,
    event_start_time,
    event_finish_time,
    event_repeat
)
VALUES

-- Active now, expires in 2 weeks
(
    1,
    1,
    CURRENT_TIMESTAMP - INTERVAL '2 days',
    CURRENT_TIMESTAMP + INTERVAL '14 days',
    '08:00',
    '12:00',
    'daily'
),

-- Active now
(
    2,
    2,
    CURRENT_TIMESTAMP - INTERVAL '1 day',
    CURRENT_TIMESTAMP + INTERVAL '10 days',
    '09:00',
    '13:00',
    'weekdays'
),

-- Starts today
(
    3,
    3,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP + INTERVAL '7 days',
    '10:00',
    '14:00',
    'weekly'
),

-- Starts tomorrow
(
    4,
    4,
    CURRENT_TIMESTAMP + INTERVAL '1 day',
    CURRENT_TIMESTAMP + INTERVAL '15 days',
    '08:00',
    '15:00',
    'daily'
),

-- Long-running emergency schedule
(
    5,
    5,
    CURRENT_TIMESTAMP - INTERVAL '3 days',
    CURRENT_TIMESTAMP + INTERVAL '30 days',
    '00:00',
    '23:59',
    'daily'
),

-- Starts in 2 days
(
    6,
    6,
    CURRENT_TIMESTAMP + INTERVAL '2 days',
    CURRENT_TIMESTAMP + INTERVAL '21 days',
    '07:00',
    '15:00',
    'daily'
),

-- Orthopedics
(
    7,
    7,
    CURRENT_TIMESTAMP + INTERVAL '3 days',
    CURRENT_TIMESTAMP + INTERVAL '18 days',
    '07:30',
    '12:30',
    'weekdays'
),

-- ENT
(
    8,
    8,
    CURRENT_TIMESTAMP + INTERVAL '4 days',
    CURRENT_TIMESTAMP + INTERVAL '20 days',
    '11:00',
    '16:00',
    'weekdays'
);

-- =====================================================
-- EVENTS
-- =====================================================

INSERT INTO tbl_event (
    event_id,
    schedule_id,
    event_begin,
    event_finish
)
VALUES

(
    1,
    1,
    CURRENT_TIMESTAMP + INTERVAL '1 day',
    CURRENT_TIMESTAMP + INTERVAL '1 day 4 hours'
),

(
    2,
    1,
    CURRENT_TIMESTAMP + INTERVAL '2 days',
    CURRENT_TIMESTAMP + INTERVAL '2 days 4 hours'
),

(
    3,
    2,
    CURRENT_TIMESTAMP + INTERVAL '3 days',
    CURRENT_TIMESTAMP + INTERVAL '3 days 4 hours'
),

(
    4,
    3,
    CURRENT_TIMESTAMP + INTERVAL '4 days',
    CURRENT_TIMESTAMP + INTERVAL '4 days 4 hours'
),

(
    5,
    4,
    CURRENT_TIMESTAMP + INTERVAL '5 days',
    CURRENT_TIMESTAMP + INTERVAL '5 days 7 hours'
),

(
    6,
    5,
    CURRENT_TIMESTAMP + INTERVAL '1 day',
    CURRENT_TIMESTAMP + INTERVAL '1 day 23 hours'
),

(
    7,
    6,
    CURRENT_TIMESTAMP + INTERVAL '6 days',
    CURRENT_TIMESTAMP + INTERVAL '6 days 8 hours'
),

(
    8,
    7,
    CURRENT_TIMESTAMP + INTERVAL '7 days',
    CURRENT_TIMESTAMP + INTERVAL '7 days 5 hours'
),

(
    9,
    8,
    CURRENT_TIMESTAMP + INTERVAL '8 days',
    CURRENT_TIMESTAMP + INTERVAL '8 days 5 hours'
);

-- =====================================================
-- EMPLOYEE ASSIGNMENTS
-- =====================================================

INSERT INTO tbl_schedule_employees_list (
    employee_id,
    schedule_id
)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
    (6, 6),
    (7, 7),
    (8, 8),
    (9, 1),
    (10, 5);

-- =====================================================
-- USERS
-- =====================================================

INSERT INTO tbl_user (
    user_id,
    user_email,
    user_password,
    user_username
)
VALUES
(
    1,
    'admin@hospital.local',
    '$2a$10$abcdefghijklmnopqrstuv',
    'admin'
),
(
    2,
    'scheduler@hospital.local',
    '$2a$10$abcdefghijklmnopqrstuv',
    'scheduler'
),
(
    3,
    'viewer@hospital.local',
    '$2a$10$abcdefghijklmnopqrstuv',
    'viewer'
);

-- =====================================================
-- ROLES
-- =====================================================

INSERT INTO tbl_user_roles (
    role_id,
    user_id,
    user_role
)
VALUES
    (1, 1, 'ROLE_ADMIN'),
    (2, 2, 'ROLE_SCHEDULER'),
    (3, 3, 'ROLE_VIEWER');

