CREATE SCHEMA patients;

DROP SEQUENCE IF EXISTS patients.patients_seq_id CASCADE;
DROP TABLE IF EXISTS patients.patients CASCADE;

CREATE SEQUENCE patients.patients_seq_id;

CREATE TABLE patients.patients (
    id INTEGER NOT NULL DEFAULT NEXTVAL('patients.patients_seq_id'::regclass),
    last_name VARCHAR(20) NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    middle_name VARCHAR(20) NULL,
    birth_date DATE NOT NULL,
    gender CHAR(1) NOT NULL,
    address VARCHAR(20) NULL,
    phone_number VARCHAR(20) NULL,
    CHECK (gender IN ('m', 'f')),
    PRIMARY KEY (id),
    UNIQUE (last_name, first_name, middle_name)
);

INSERT INTO patients.patients VALUES 
(1, 'Macalalag', 'Sandae', null, '2018-09-08', 'm', null, null);

REVOKE ALL PRIVILEGES ON patients.patients FROM patient_anon;
REVOKE ALL PRIVILEGES ON patients.patients FROM patient_user;

DROP ROLE IF EXISTS patient_anon;
DROP ROLE IF EXISTS patient_user;

CREATE ROLE patient_anon nologin;
GRANT patient_anon TO postgres;
GRANT USAGE ON SCHEMA patients TO patient_anon;
GRANT SELECT ON patients.patients TO patient_anon;

CREATE ROLE patient_user nologin;
GRANT patient_user TO postgres;

GRANT USAGE ON SCHEMA patients TO patient_user;
GRANT ALL ON patients.patients TO patient_user;
GRANT USAGE, SELECT ON SEQUENCE patients.patients_seq_id TO patient_user;



