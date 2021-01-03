DROP DATABASE IF EXISTS estimator;
CREATE DATABASE estimator;
USE estimator;

CREATE TABLE users (
    id 			BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    last_name 	VARCHAR(200) NOT NULL,
    first_name 	VARCHAR(200) NOT NULL,
    username 	VARCHAR(200) NOT NULL,
    password 	VARCHAR(200) NOT NULL,
    `type` 		ENUM ('Estimator', 'Administrator') NOT NULL,
    UNIQUE INDEX (username)
) ENGINE=InnoDB;
	
INSERT INTO users 
	(last_name, first_name, username, password, `type`)
	values
	('nistratro', 'admin', 'admin', 'admin', 'Administrator'),
	('mator', 'esti', 'esti', 'esti', 'Estimator');
	
CREATE TABLE components (
	id  		BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name 		VARCHAR(200) NOT NULL,
	rate 		DECIMAL(10, 2),
	`type` 		ENUM ('Material', 'Equipment', 'Labor') NOT NULL,
    measurement VARCHAR(10) NULL,
	category	VARCHAR(200) NULL,
	UNIQUE INDEX (name)
) ENGINE=InnoDB;

INSERT INTO components (name, rate, `type`, measurement) VALUES
	('Material 1', 2, 'Material', 'inch'),
	('Material 2', 3, 'Material', 'inch'),
	('Equipment 1', 4, 'Equipment', null), 
	('Equipment 2', 5, 'Equipment', null),
	('Labor 1', 6, 'Labor', null),
	('Labor 2', 7, 'Labor', null);
	

CREATE TABLE component_categories (
	id  		BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name 		VARCHAR(200) NOT NULL,
	UNIQUE INDEX (name)
);

INSERT INTO component_categories (name) VALUES ('Component CAT 1'), ('Component CAT 2');

CREATE TABLE projects (
	id  			BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name 			VARCHAR(200) NOT NULL,
	location 		VARCHAR(200) NOT NULL,
	description 	TEXT,
	category 		VARCHAR(200) NOT NULL,
	contract_id 	VARCHAR(200) NOT NULL,
	UNIQUE INDEX (contract_id)
) ENGINE=InnoDB;

CREATE TABLE projects_users (
	id  		BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
	user_id 	BIGINT UNSIGNED NOT NULL,
	project_id 	BIGINT UNSIGNED NOT NULL,
	UNIQUE INDEX (user_id, project_id),
	FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
	FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE logs (
	id  		BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
	user_id 	BIGINT UNSIGNED NOT NULL,
	ip_address 	VARCHAR(200) NOT NULL,
	activity 	TEXT NOT NULL,
	log_datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE project_categories (
	id  		BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name 		VARCHAR(200) NOT NULL,
	UNIQUE INDEX(name)
);

INSERT INTO project_categories (name) VALUES ('Project CAT 1'), ('Project CAT 2');

CREATE TABLE project_items (
	id  		BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name		VARCHAR(200) NOT NULL,
	description VARCHAR(200) NOT NULL,
	measurement VARCHAR(50) NOT NULL,
	UNIQUE INDEX(name)
) ENGINE=InnoDB;

INSERT INTO project_items (name, description) VALUES 
	('Item 1', 'Some description'),
	('Item 2', 'Another description');

CREATE TABLE project_builds (
        id  			BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
        project_id              BIGINT UNSIGNED NOT NULL,
        project_item_id         BIGINT UNSIGNED NOT NULL,
        quantity                DOUBLE NOT NULL,
        note                    VARCHAR(200) NULL,
        UNIQUE INDEX (project_id, project_item_id),
        FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE,
        FOREIGN KEY (project_item_id) REFERENCES project_items (id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE project_components (
	id						BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
	project_build_id	 	BIGINT UNSIGNED NOT NULL,
	component_id			BIGINT UNSIGNED NOT NULL,
	quantity				BIGINT UNSIGNED NOT NULL,
	no_of_days				BIGINT UNSIGNED NOT NULL,
	FOREIGN KEY (project_build_id) REFERENCES project_builds (id) ON DELETE CASCADE,
	FOREIGN KEY (component_id) REFERENCES components (id) ON DELETE CASCADE
) ENGINE=InnoDB;