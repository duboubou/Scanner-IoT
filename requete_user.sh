#!/bin/bash
#Usage sudo bash ./requete_user.sh req_wifi_1 param_1
#Mettre en $1 le nom de la fonction
#Mettre en $2 le paramètre si nécessaire

#Affiche l'historique des APs
connexion () {
mysql -u user_iot<<EOF
USE db_projet_iot
EOF
}

req_wifi_1 () {
connexion
SELECT * FROM table_Accesspoint ORDER BY last_time_seen;<<EOF
EOF
}

#Affiche l'historique des Stations
req_wifi_2 () {
connexion
SELECT * FROM table_Stations ORDER by last_time_sta;<<EOF
EOF
}

#Affiche les stations connectés à l'argument arg_AP
req_wifi_3 () {
connexion
SELECT * FROM table_Stations WHERE bssid_sta = "$2";<<EOF2
EOF2
}


req_wifi_3
echo "$2";
