#!/bin/bash

mysql -u user_iot<<EOF
USE db_projet_iot
DROP TABLE table_Accesspoint;
DROP TABLE table_Bluetooth;
DROP TABLE table_Rtl;
DROP TABLE table_Stations;
DROP DATABASE db_projet_iot;

EOF
	

rm /var/www/html/project/dossier_json/req*
rm /var/www/html/project/dossierwww-data/donnees*
rm /var/www/html/project/dossier_wifi2/*
rm /var/www/html/project/dossier_rtl2/rtl*
rm /var/www/html/project/dossier_rtl/*

#rm /var/www/html/project/dossier_ble2/*
#rm /var/www/html/project/dossier_ble/*


echo "" > /var/www/html/project/dossier_ble/adresses.csv
echo "" > /var/www/html/project/dossier_ble/informations.csv
echo "" >  /var/www/html/project/dossier_ble/output.txt
echo "" >  /var/www/html/project/dossier_ble/sansdoublons.txt
echo "" >  /var/www/html/project/dossier_ble/temp.txt

echo "" >  /var/www/html/project/dossier_ble2/outputbis.txt
echo "" >  /var/www/html/project/dossier_ble2/temp_bluetooth.txt

#chmod -R 777 /var/html/project

#chmod -R 777 /var/www/html/project/dossier_ble
#chmod -R 777 /var/www/html/project/dossier_ble2
#chmod -R 777 /var/www/html/project/dossier_rtl
#chmod -R 777 /var/www/html/project/dossier_rtl2



echo "Base de donnée remis à 0"