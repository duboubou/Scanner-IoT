#!bin/bash

sudo mysql <<EOF 

CREATE USER IF NOT EXISTS 'user_iot'@'localhost';

GRANT ALL PRIVILEGES ON db_projet_iot.* TO 'user_iot'@'localhost';

SET @@global.sql_mode= 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';

exit

EOF

mysql -u user_iot <<EOF2

DROP DATABASE IF EXISTS db_projet_iot;

CREATE DATABASE db_projet_iot;

USE db_projet_iot
CREATE TABLE IF NOT EXISTS table_Accesspoint (
	bssid CHAR(17),
	last_time_seen DATETIME, 
	channel TINYINT,
	privacy VARCHAR(20),
	cipher VARCHAR(20),
	authentication VARCHAR(10),
	beacon INT,
	essid VARCHAR(100),
	nb_sta_co INT,
	key_com INT NOT NULL AUTO_INCREMENT PRIMARY KEY
)

ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS table_Stations (
	macaddr_sta CHAR(17),
	last_time_sta DATETIME,
	power INT,
	packets_num INT,
	bssid_sta CHAR(17),
	probe VARCHAR(50)
);


CREATE TABLE IF NOT EXISTS table_Rtl (
	timestamp DATETIME,
	product VARCHAR(50),
	temperature FLOAT,
	humidity FLOAT,
	pressure INT
);

CREATE TABLE IF NOT EXISTS table_Bluetooth (
	macaddr_ble CHAR(17),
	nom_ble VARCHAR(50),
	handle INT,
	manufacturer VARCHAR(50),
	lmp_version FLOAT,
	lmp_subversion VARCHAR(50),
	features VARCHAR(60)
);

DESCRIBE table_Accesspoint; 
DESCRIBE table_Stations;
DESCRIBE table_Rtl;
DESCRIBE table_Bluetooth; 

EOF2
