#!/bin/bash
#Script qui permet de lancer airodump-ng 
#Enregistre les sorties sur un fichier à part dans le répertoire /tmp 
#Mettre en $1 [start/stop/status]
#Mettre en $2 l'interface de votre machine (voir commande airmon-ng)

string_date=$(date +%F%H%M%S)
string_mon='mon'

#sudo mkdir dossierwww-data
#sudo chown www-data:www-data ./dossierwww-data

if [ "$1" == "start" ]
then
	echo "BONJOUUUUUUUUUR"
	sudo airmon-ng start "$2"
	#fakeroot airodump-ng -w ./dossierwww-data/"$string_date" "$2$string_mon" >/tmp/1 2>/tmp/1  &
	sudo airodump-ng  -w /var/www/html/project/dossierwww-data/donneeswifi --output-format csv --write-interval 2 "$2$string_mon"
	#sleep 10
	#pkill airodump-ng
	#fakeroot airmon-ng stop "$2$string_mon"
	#echo "$?"
	#echo "$string_date"
	
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
