#!/bin/bash

#Recherche dans la bdd la date du dernier objet scanné 
last_date_rtl=$(echo "USE db_projet_iot; SELECT MAX(timestamp) FROM table_Rtl;" |mysql -u user_iot db_projet_iot | tail -1)
echo "$last_date_rtl"

#Récupère le dernier fichier csv créé dans le dossier du chemin
chemin="/var/www/html/project/dossier_rtl/"
cd $chemin
fichier=$(ls -got | grep \.csv$ | head -1 | awk '{print $7}')
echo "$fichier"

#Recherche dans le fichier la date du dernier objet scanné et retourne son numéro de ligne 
start_line_rtl=$(($(grep -n "$last_date_rtl" "$chemin$fichier" |head -n 1 | cut -d: -f 1)+1))
echo $start_line_rtl

#Récupère le numéro de ligne de fin RTLs
endline_RTL=$(wc -l $chemin$fichier | cut -f 1 -d ' ')
echo $endline_RTL

isoler_new_rtl () {
	sed -n -e "$1, $2""p" $chemin$fichier > /tmp/rtl_new.csv
}



insertion_RTL () {
	while read ligne
	do
		var_timestamp=$(echo $ligne | awk -F"," '{ print $1 }')
		var_product=$(echo $ligne | awk -F"," '{ print $4 }')
		var_temperature=$(echo $ligne | awk -F"," '{ print $9 }')
		var_pressure=$(echo $ligne | awk -F"," '{ print $21 }')
		var_humidity=$(echo $ligne | awk -F"," '{ print $12 }') 
		
mysql -u user_iot<<EOF2
USE db_projet_iot
INSERT INTO table_Rtl
VALUES ("$var_timestamp", "$var_product", "$var_temperature", "$var_humidity", "$var_pressure", NULL);
EOF2

	done < $1
}




#Si le programme a trouvé une correspondance alors on écrit qu'à partir de cette ligne (AP)
if [[ "$start_line_rtl" != "" ]]
then
	isoler_new_rtl $start_line_rtl $endline_RTL
	insertion_RTL /tmp/rtl_new.csv
else
	isoler_lignes "2" "$endline_RTL" 
	insertion_RTL /tmp/rtl_new.csv
fi 
