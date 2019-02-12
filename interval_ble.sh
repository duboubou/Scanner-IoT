#!/bin/bash
chemin="/var/www/html/project/dossier_ble/"
fichier="sansdoublons.txt"
adresses="adresses.csv"
output="output.txt"
informations="informations.csv"

#sudo hciconfig hci0 down
#sudo hciconfig hci0 up
#sudo hcitool lescan > $chemin$output &
#sleep 10


sort $chemin$output | uniq > $chemin"temp.txt"
sed '$d' $chemin"temp.txt" > $chemin$fichier #supprime la dernière ligne

while read ligne
	do
		ble_mac_adr=$(echo $ligne | awk -F" " '{ print $1 }')
		ble_nom=$(echo $ligne | awk -F" " '{ print $2 }')
		ble_info=$(sudo hcitool leinfo $ble_mac_adr 2>&1)
		
mysql -u user_iot<<EOF
USE db_projet_iot
INSERT INTO table_Bluetooth
VALUES ("$ble_mac_adr", "$ble_nom", "$ble_info", NOW());
EOF
		
	done < $chemin$fichier

#while read -r line; do
#adr=$(egrep -o "[A-Z0-9]{2}:[A-Z0-9]{2}:[A-Z0-9]{2}:[A-Z0-9]{2}:[A-Z0-9]{2}:[A-Z0-9]{2}" $chemin$fichier > $chemin$adresses)
#echo "MAC : $adr"
#done < $chemin$fichier

#while read -r line; do
#info=$(sudo hcitool leinfo $line)
#echo "$line $info" >> $chemin$informations
#done < $chemin$adresses
