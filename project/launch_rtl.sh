#!/bin/bash
#Mettre en $1 [start/stop/status]
#Si start : lancement de rtl-433 puis création d'un fichier csv 
#Si stop : arrêt du processus
#Si status : print si le process est en cours ou non


#Récupère un nom de fichier unique 
#str_date=$(date +%F%H%M%S)

case "$1" in
  start|"")
	echo "start le rtl_433"
	rtl_433 -G -F csv:/var/www/html/project/dossier_rtl/fichier.csv &
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
