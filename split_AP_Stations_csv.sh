#!/bin/bash
#Ce script permet de spliter un fichier csv en deux à partir de la ligne contenant "Station MAC"
#Les nouveaux fichiers sont créés dans le répertoire /tmp/
#Usage : bash ./split_AP_Stations_csv.sh name_csv_file.csv 

#AMELIORER : enlever l'extension de $1 et ajouter juste bis à la fin

#Récupère un nom de fichier
str_date=$(date +%F%H%M%S)
string_bis='bis'
str_name_new_file="$str_date$string_bis"
echo "$str_name_new_file"

#Créer le deuxième fichier csv
touch /tmp/$str_name_new_file.csv

#Récupère le numéro de ligne à partir duquel nous avons "Station MAC"
start_line=$(grep -n "Station MAC" $1 | cut -f 1 -d :)
echo "$start_line"

#Récupère la longueur totale du fichier $1
lenght_file=$(wc -l $1 | cut -f 1 -d ' ')
echo "$lenght_file"

#Ecris dans un nouveau fichier les lignes des stations
sed -n -e "$start_line, $lenght_file""p" $1 > /tmp/$str_name_new_file"station".csv

#Ecris dans un nouveau fichier les lignes des APs
one="1"
sed -n -e "$one,$(($start_line-1))""p" $1 > /tmp/$str_name_new_file"APs".csv

