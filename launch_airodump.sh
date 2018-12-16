#!/bin/bash
#Script qui permet de lancer airodump-ng 
#Enregistre les sorties sur un fichier à part dans le répertoire /tmp 
#Mettre en $1 [start/stop/status]
#Mettre en $2 l'interface de votre machine (voir commande airmon-ng)

string_date=$(date +%F%H%M%S)
string_mon='mon'

if [ "$1" == "start" ]
then
	echo "BONJOUUUUUUUUUR"
	sudo airmon-ng start "$2"
	sudo timeout 50 airodump-ng -w /tmp/"$string_date" "$2$string_mon" 
	echo "$?"
	echo "$string_date"
	
elif [ "$1" == "stop" ]
then 
	sudo airmon-ng stop "$2$string_mon"
	echo "Mode moniteur stopppé."
elif [ "$1" == "status" ]
then
	echo "Impossible de savoir si le processus Aircrack-ng est toujours en fonctionnement. Si votre wifi ne fonctionne pas, essayer sudo airmon-ng stop [interface]mon."

else
	echo "Bad argument"
fi
