#!/bin/bash
#ATTENTION : il faut traiter les STA avant les APs car nous comptons les STA pour chaque APs après


#Prend en argument 1 : départ de ligne du csv à insérer dans mysql
#Prend en argument 2: fin de ligne du csv à insérer dans mysql
#Prend en argument 3 : nom du fichier temporaire
isoler_lignes () {
	sed -n -e "$1, $2""p" $chemin$fichier > /tmp/$3.csv
}

#Insère les lignes du Csv dans mysql pour les STA
#Prend en argument le fichier à lire

insertion_STA () {
	while read ligne
	do
		var_mac_sta=$(echo $ligne | awk -F"," '{ print $1 }')
		var_last_time_sta=$(echo $ligne | awk -F"," '{ print $3 }')
		var_power=$(echo $ligne | awk -F"," '{ print $4 }')
		var_packet_num=$(echo $ligne | awk -F"," '{ print $5 }')
		var_bssid_sta=` echo $ligne | awk -F"," '{ print $6 }' | sed -e " s/\ //g" ` #En supprimant les espaces du champ 5 
		var_probe=$(echo $ligne | awk -F"," '{ print $7 }')
		
mysql -u user_iot<<EOF2
USE db_projet_iot
INSERT INTO table_Stations
VALUES ("$var_mac_sta", "$var_last_time_sta", "$var_power", "$var_packet_num", "$var_bssid_sta", "$var_probe");
EOF2
		
	done < $1
}

#Insère les lignes du Csv dans mysql pour les APs
#Prend en argument le fichier à lire
insertion_APs () {
	while read ligne
	do
		var_bssid=$(echo $ligne | awk -F"," '{ print $1 }')
		var_last_time_seen=$(echo $ligne | awk -F"," '{ print $3 }')
		var_channel=$(echo $ligne | awk -F"," '{ print $4 }')
		var_privacy=$(echo $ligne | awk -F"," '{ print $6 }')
		var_cipher=$(echo $ligne | awk -F"," '{ print $7 }')
		var_authentication=$(echo $ligne | awk -F"," '{ print $8 }')
		var_beacon=$(echo $ligne | awk -F"," '{ print $10 }')
		var_essid=$(echo $ligne | awk -F"," '{ print $14 }')
		var_nb_sta=$(grep -c "$var_bssid" /tmp/"temp_STA".csv)
		
mysql -u user_iot <<EOF
USE db_projet_iot
INSERT INTO table_Accesspoint
VALUES ("$var_bssid", "$var_last_time_seen", "$var_channel", "$var_privacy", "$var_cipher", "$var_authentication", "$var_beacon", "$var_essid", "$var_nb_sta", NULL);
EOF

	done < $1

}


#Récupère le dernier fichier csv créé dans le dossier du chemin
chemin="/var/www/html/project/dossierwww-data/"
cd $chemin
fichier=$(ls -got | grep \.csv$ | head -1 | awk '{print $7}')
echo "$fichier"

#Donne les droits au fichier nouvellement créé 
chmod 777 $chemin$fichier

#Récupère le numéro de la ligne où nous avons "STATIONS MACs" 
end_line_AP=$(($(grep -n "Station MAC" $fichier | cut -f 1 -d :)-2)) #Soustrait de 2 pour avoir la fin des APs
echo "$end_line_AP"

#Récupère le numéro de ligne de fin des STAs
endline_STA=$(wc -l $chemin$fichier | cut -f 1 -d ' ')
echo "$endline_STA"

#last_date_ap=($(mysql -u user_iot db_projet_iot -Bse "USE db_projet_iot; SELECT MAX(last_time_seen) FROM table_Accesspoint;"))

#Recherche dans la bdd la date du dernier objet scanné (la date la plus récente) (STA)
last_date_ap=$(echo "USE db_projet_iot; SELECT MAX(last_time_seen) FROM table_Accesspoint;" |mysql -u user_iot db_projet_iot | tail -1)
echo "$last_date_ap"

#Recherche dans le fichier la date du dernier objet scanné et retourne son numéro de ligne (AP)
#start_line_ap=$(grep -n "$last_date_ap" "$chemin$fichier" | cut -c1)
start_line_ap=$(grep -n "$last_date_ap" "$chemin$fichier" |head -n 1 | cut -d: -f 1)
echo $start_line_ap

#Recherche dans la bdd la date du dernier objet scanné (la date la plus récente) (STA)
last_date_sta=$(echo "USE db_projet_iot; SELECT MAX(last_time_sta) FROM table_Stations;" |mysql -u user_iot db_projet_iot | tail -1)
echo "$last_date_sta"

#Recherche dans le fichier la date du dernier objet scanné et retourne son numéro de ligne (STA)
start_line_sta=$(grep -n "$last_date_sta" "$chemin$fichier"| tail -1 | cut -d: -f 1)
echo $start_line_sta


#Si le programme a trouvé une correspondance alors on écrit qu'à partir de cette ligne (AP)
if [[ "$start_line_sta" != "" ]]
then
	isoler_lignes "$start_line_sta" "$endline_STA" "temp_STA"
	insertion_STA /tmp/"temp_STA".csv
else
	echo "Passage 1"
	isoler_lignes $(($end_line_AP+1)) "$endline_STA" "temp_STA"
	insertion_STA /tmp/"temp_STA".csv
fi 

#Si le programme a trouvé une correspondance alors on écrit qu'à partir de cette ligne (AP)
if [[ "$start_line_ap" != "" ]]
then
	isoler_lignes "$start_line_ap" "$end_line_AP" "temp_AP"
	insertion_APs /tmp/"temp_AP".csv
else
	echo "Passage 2"
	isoler_lignes "3" "$end_line_AP" "temp_AP"
	insertion_APs /tmp/"temp_AP".csv
fi 


gros="2018-12-26 20:06:20"
petit="2018-12-26 19:07:23"

if [[ "$gros" > "$petit" ]]
then
	echo "c'est bon"
else
	echo "bad"
fi
