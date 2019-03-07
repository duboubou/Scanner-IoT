#!/bin/bash
#Mettre en $1 [start/stop/status]
#Si start : lancement de hcitool
#Si stop : arrêt du processus
#Si status : print si le process est en cours ou non

chemin="/var/www/html/project/dossier_ble/"
output="output.txt"

#Récupère un nom de fichier unique 
#str_date=$(date +%F%H%M%S)

case "$1" in
  start|"")
	hciconfig hci0 down 
	hciconfig hci0 up
	stdbuf -oL hcitool lescan| while IFS= read -r line; do printf '%s %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$line"; done > $chemin$output 2>/dev/null &
 	#sleep 5
	;;
  stop)
	pkill --signal SIGINT hcitool
	;;
  status)
  if [[ $(ps -ef | grep hcitool | grep -v grep | wc -l) != 0 ]]; then
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
