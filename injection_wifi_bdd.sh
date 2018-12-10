#!/bin/bash
#Ce script permet de spliter un fichier csv en deux à partir de la ligne contenant "Station MAC"
#Les nouveaux fichiers sont créés dans le répertoire /tmp/
#Après le split, on nettoie les colonnes non utiles.
#Le sript ajoute à chaque ligne le nombre d'appareils connectés à un AP
#Usage : bash ./split_AP_Stations_csv.sh name_csv_file.csv 
#Doit être effectué en sudo

####### PREPARATION DES DONNEES #######

#Récupère un nom de fichier
str_date=$(date +%F%H%M%S)
string_bis='bis'
str_name_new_file="$str_date$string_bis"
echo "$str_name_new_file"

#Récupère le numéro de ligne à partir duquel nous avons "Station MAC"
start_line=$(grep -n "Station MAC" $1 | cut -f 1 -d :)
echo "$start_line"

#Récupère la longueur totale du fichier $1
lenght_file=$(wc -l $1 | cut -f 1 -d ' ')
echo "$lenght_file"

#Ecris dans un nouveau fichier les lignes des stations
sed -n -e "$start_line, $lenght_file""p" $1 > /tmp/"temp_csv".csv
#Ecris dans un nouveau fichier les mêmes lignes en enlevant les colonnes inutiles
cut -d , -f 1,4-7 /tmp/"temp_csv".csv > /tmp/$str_name_new_file"station".csv


#Ecris dans un nouveau fichier les lignes des APs
one="1"
sed -n -e "$one,$(($start_line-1))""p" $1 > /tmp/"temp_csv".csv
#Ecris dans un nouveau fichier les mêmes lignes en enlevant les colonnes inutiles
cut -d , -f 1,4,6-8,10,14,15 /tmp/"temp_csv".csv > /tmp/$str_name_new_file"APs".csv

#Suppression des entêtes 
sed '1,2d' /tmp/$str_name_new_file"APs".csv > /tmp/"temp_csv".csv
cat /tmp/"temp_csv".csv > /tmp/$str_name_new_file"APs".csv
sed '1d' /tmp/$str_name_new_file"station".csv > /tmp/"temp_csv".csv 
cat /tmp/"temp_csv".csv > /tmp/$str_name_new_file"station".csv

chmod 777 /tmp/$str_name_new_file"APs".csv
chmod 777 /tmp/$str_name_new_file"station".csv

####### INSERTION BDD ########

#Insertion des APs
cat /tmp/$str_name_new_file"APs".csv > /tmp/temp.txt
while read ligne
do
	var_bssid=$(echo $ligne | awk -F"," '{ print $1 }')
	var_channel=$(echo $ligne | awk -F"," '{ print $2 }')
	var_privacy=$(echo $ligne | awk -F"," '{ print $3 }')
	var_cipher=$(echo $ligne | awk -F"," '{ print $4 }')
	var_authentication=$(echo $ligne | awk -F"," '{ print $5 }')
	var_beacon=$(echo $ligne | awk -F"," '{ print $6 }')
	var_essid=$(echo $ligne | awk -F"," '{ print $7 }')
	var_nb_sta=$(grep -c "$var_bssid" /tmp/$str_name_new_file"station".csv)
	
mysql -u user_IOT -ppodium123 <<EOF
USE iot
INSERT INTO Accesspoint
VALUES ('$var_bssid', '$var_channel', '$var_privacy', '$var_cipher', '$var_authentication', '$var_beacon', '$var_essid', '$var_nb_sta', NULL);
EOF

done < /tmp/temp.txt


#Insertion des Stations
cat /tmp/$str_name_new_file"station".csv > /tmp/temp.txt
while read ligne
do
	var_mac_sta=$(echo $ligne | awk -F"," '{ print $1 }')
	var_power=$(echo $ligne | awk -F"," '{ print $2 }')
	var_packet_num=$(echo $ligne | awk -F"," '{ print $3 }')
	var_bssid=$(echo $ligne | awk -F"," '{ print $4 }')
	var_probe=$(echo $ligne | awk -F"," '{ print $5 }')

	echo "$var_mac_sta";
	echo "$var_power";
	echo "$var_packet_num";
	echo "$var_bssid";
	echo "$var_probe""Bonjour";
	
mysql -u user_IOT -ppodium123 <<EOF 
USE iot
INSERT INTO Stations
VALUES ('$var_mac_sta', '$var_power', '$var_packet_num', '$var_bssid', '$var_probe', NULL);
EOF
	
done < /tmp/temp.txt





