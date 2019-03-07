#!/bin/bash
chemin="/var/www/html/project/dossier_ble/"
fichier="sansdoublons.txt"
adresses="adresses.csv"
output="output.txt"
informations="informations.csv"

isoler_lignes () {
	sed -n -e "$1, $2""p" $chemin"temp.txt" > /tmp/temp_bluetooth.txt
}


insertion_BLE () {

	while read ligne
		do
			ble_timestamp=$(echo $ligne |awk -F" " '{ print $1" "$2 }')
			ble_mac_adr=$(echo $ligne | awk -F" " '{ print $3 }')
			ble_nom=$(echo $ligne | awk -F" " '{ print $4 }')
			ble_info=$(sudo hcitool leinfo $ble_mac_adr 2>&1)

mysql -u user_iot<<EOF
USE db_projet_iot
INSERT INTO table_Bluetooth
VALUES ("$ble_mac_adr", "$ble_nom", "$ble_info", "$ble_timestamp", NULL);
EOF
		
	done < /tmp/temp_bluetooth.txt
}



sed '/LE Scan/d' $chemin$output > /tmp/outputbis.txt #Supprime la ligne contenant LE Scan
sort /tmp/outputbis.txt | uniq > $chemin"temp.txt"


#Recherche dans la bdd la date du dernier objet scanné (la date la plus récente)
last_date_ble=$(echo "USE db_projet_iot; SELECT MAX(last_time_ble) FROM table_Bluetooth;" | mysql -u user_iot db_projet_iot | tail -1)
echo "$last_date_ble"

#Recherche dans le fichier la date du dernier objet scanné et retourne son numéro de ligne
start_line_BLE=$(grep -n "$last_date_ble" $chemin$"temp.txt"| tail -1 | cut -d: -f 1)
echo $start_line_BLE

#Récupère le numéro de ligne de fin des objets
endline_BLE=$(wc -l $chemin"temp.txt" | cut -f 1 -d ' ')
echo "$endline_BLE"

#Si le programme a trouvé une correspondance alors on écrit qu'à partir de cette ligne
if [[ "$start_line_ap" != "" ]]
then
	isoler_lignes "$start_line_BLE" "$endline_BLE" 
	insertion_BLE
else
	echo "Passage 2"
	isoler_lignes "1" "$endline_BLE" 
	insertion_BLE
fi 
