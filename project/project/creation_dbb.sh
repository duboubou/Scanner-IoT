#!/bin/bash

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
	probe VARCHAR(50),
	key_com_sta INT NOT NULL AUTO_INCREMENT PRIMARY KEY
);


CREATE TABLE IF NOT EXISTS table_Rtl (
	timestamp DATETIME,
	product VARCHAR(50),
	temperature FLOAT,
	humidity FLOAT,
	pressure INT,
	key_com_Rtl INT NOT NULL AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS table_Bluetooth (
	macaddr_ble CHAR(17),
	nom_ble VARCHAR(50),
	more_info VARCHAR(150),
	last_time_ble DATETIME,
	key_com_ble INT NOT NULL AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS table_Historique (
	date_scan DATETIME,
	nb_wifi INT,
	nb_rtl INT,
	nb_ble INT,
	nb_station INT,
	key_com_histo INT NOT NULL AUTO_INCREMENT PRIMARY KEY

);

EOF2

