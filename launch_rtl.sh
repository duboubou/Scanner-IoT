#!/bin/bash
#Mettre en $1 [start/stop/status]
#Si start : lancement de rtl-433 puis création d'un fichier csv et tri de celui-ci. Injection des données dans la base de données
#Si stop : arrêt du processus
#Si status : print si le process est en cours ou non


#Récupère un nom de fichier unique 
str_date=$(date +%F%H%M%S)

case "$1" in
  start|"")
	rtl_433 -G -q -T 50 -F csv:/tmp/$str_date"RTL".csv
	cut -d ',' -f 1,4,9,12,14,114 /tmp/$str_date"RTL".csv > /tmp/log_csv_cut.csv
mysql -u user_iot <<EOF
USE db_projet_iot
LOAD DATA LOCAL INFILE '/tmp/log_csv_cut.csv'
INTO TABLE table_Rtl
FIELDS TERMINATED BY ','
IGNORE 1 LINES;
EOF

	;;
  stop)
	killall -9 rtl_433
	;;
  status)
  if [[ $(ps -ef | grep rtl_433 | grep -v grep | wc -l) != 0 ]]; then
    echo "True"
  else
    echo "False"
  fi
	;;
  *)
	echo "Commande non autorisée, utilisez start, stop ou status" >&2
	exit 3
	;;
esac
