#!/bin/bash
#En tant que root : CREATE USER 'user_IOT'@'localhost' IDENTIFIED BY 'podium123' 
#En tant que root : GRANT ALL PRIVILEGES ON iot.* TO 'user_IOT'@'localhost';
#En tant que root : SET @@global.sql_mode= 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION'; #Enleve le mode STRICT pour ne pas avoir le message d'erreur too long

mysql -u user_IOT -ppodium123 <<EOF #default-character-set=utf8;

DROP DATABASE IF EXISTS iot;

CREATE DATABASE iot; #CHARACTER SET 'utf-8';

USE iot
CREATE TABLE IF NOT EXISTS Accesspoint (
	#id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	bssid CHAR(17),
	#firstseen DATETIME,
	#lasttseen DATETIME,
	channel TINYINT,
	#speed INT,
	privacy VARCHAR(20),
	cipher VARCHAR(20),
	authentication VARCHAR(10),
	#power INT,
	beacon INT,
	#iv INT,
	#lan_ip CHAR(16),
	#id_lenght INT,
	essid VARCHAR(100),
	nb_sta_co INT,
	key_com INT NOT NULL AUTO_INCREMENT PRIMARY KEY
)

ENGINE=INNODB;


USE iot
CREATE TABLE IF NOT EXISTS Stations (
	macaddr CHAR(17),
	power INT,
	packets_num INT,
	bssid_sta CHAR(17),
	probe VARCHAR(50),
	key_com_sta INT NOT NULL AUTO_INCREMENT PRIMARY KEY
)

ENGINE=INNODB;

EOF


