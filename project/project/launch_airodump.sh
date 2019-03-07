#!/bin/bash
#Mettre en $1 [start/stop/status]
#Si start : lancement de airodump-ng 
#Si stop : arrêt du processus
#Si status : print si le process est en cours ou non


string_mon='mon'

#Récupère un nom de fichier unique 
#str_date=$(date +%F%H%M%S)

case "$1" in
  start|"")
	sudo airmon-ng start "$2" 
	sudo airodump-ng  -w /var/www/html/project/dossierwww-data/donneeswifi --output-format csv --write-interval 2 "$2$string_mon" 
	;;
  stop)
	sudo airmon-ng stop "$2$string_mon"
	pkill airodump-ng
	;;
  status)
  if [[ $(ps -ef | grep airodump-ng | grep -v grep | wc -l) != 0 ]]; then
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
