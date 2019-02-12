#!/bin/bash
#Mettre en $1 [start/stop/status]
#Si start : lancement de rtl-433 puis création d'un fichier csv et tri de celui-ci. Injection des données dans la base de données
#Si stop : arrêt du processus
#Si status : print si le process est en cours ou non


#Récupère un nom de fichier unique 
#str_date=$(date +%F%H%M%S)

case "$1" in
  start|"")
	#rm log_csv.csv
	#rm log_csv_cut.csv
	rtl_433 -G -F csv:/tmp/log_test.csv 
	sh /var/www/html/project/test_insertion_rtl.sh
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
