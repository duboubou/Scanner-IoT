#En tant que root : GRANT ALL PRIVILEGES ON iot.* TO 'user_IOT'@'localhost';

mysql -u user_IOT -ppodium123 --default-character-set=utf8;

DROP DATABASE IF EXISTS iot;
DROP TABLE IF EXISTS Accesspoint;

CREATE DATABASE iot; #CHARACTER SET 'utf-8';
USE iot

CREATE TABLE IF NOT EXISTS Accesspoint (
	#id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	bssid CHAR(17),
	firstseen DATETIME,
	lasttseen DATETIME,
	channel TINYINT,
	speed INT,
	privacy VARCHAR(20),
	cipher VARCHAR(20),
	authentication VARCHAR(10),
	power INT,
	beacon INT,
	iv INT,
	lan_ip CHAR(16),
	id_lenght INT,
	essid VARCHAR(100),
	key_com INT NOT NULL AUTO_INCREMENT PRIMARY KEY
)

ENGINE=INNODB;

#INSERT INTO Accesspoint
#VALUES (1, '72:5D:51:1F:CC:6F',  '2018-11-18 14:29:33',  '2018-11-18 14:29:52', '1', '54', 'OPN', NULL, NULL, '-83', '13', '0', '   0.  0.  0.  0', '12', 'SFR WiFi FON', NULL);
#Si champ vide il faut mettre NULL ou ''

LOAD DATA LOCAL INFILE '/home/naisie/date03.csv'
INTO TABLE Accesspoint
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 2 LINES;

	

