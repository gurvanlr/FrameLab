CREATE TABLE IF NOT EXISTS  users (
	id          INT PRIMARY KEY AUTO_INCREMENT,
	mail        VARCHAR(127) UNIQUE NOT NULL,
	password    VARCHAR(127) NOT NULL,
	name        VARCHAR(127) NOT NULL,
	firstname   VARCHAR(127) NOT NULL,
	is_admin    BOOLEAN NOT NULL,
	registrated DATETIME,
	validated 	BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS challenges (
	id 			INT PRIMARY KEY AUTO_INCREMENT,
	title 		VARCHAR(127) NOT NULL,
	description TEXT,
	url 		VARCHAR(127) NOT NULL,
	date_start 	DATE NOT NULL,
	date_end 	DATE NOT NULL,
	is_active 	BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS participations (
    id            INT PRIMARY KEY AUTO_INCREMENT,
    user_id       INT NOT NULL,
    challenge_id  INT NOT NULL,
    url           VARCHAR(117) NOT NULL UNIQUE,
    created       DATE,
    is_visible    BOOLEAN NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (challenge_id) REFERENCES challenges(id),
    UNIQUE INDEX (user_id, challenge_id)
);

CREATE TABLE IF NOT EXISTS votes (
	id 				 INT PRIMARY KEY AUTO_INCREMENT,
	creative_note 	 INT NOT NULL,
	technical_note 	 INT NOT NULL,
	theme_note 		 INT NOT NULL,
	created 		 DATE,
	participation_id INT REFERENCES participations(id),
	user_id 		 INT REFERENCES users(id),
	UNIQUE 		     INDEX (user_id,participation_id) 
);

CREATE TABLE IF NOT EXISTS comments (
	id 				 INT PRIMARY KEY AUTO_INCREMENT,
	content 		 TEXT NOT NULL,
	created 		 DATETIME,
	is_visible  	 BOOLEAN,
	user_id INT 	 REFERENCES users(id),
	participation_id INT REFERENCES participations(id)
);