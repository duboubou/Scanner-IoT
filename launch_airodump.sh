#!bin/bash
#Script qui permet de lancer airodump-ng 
#Enregistre les sorties sur un fichier à part dans le répertoire /tmp (VOIR COMMENT TRANSFORMER EN BDD + AMELIORER LE SCRIPT)
#Mettre en $1 [start/stop/check]
#Mettre en $2 l'interface de votre machine (voir commande airmon-ng)

string_date=$(date +%F%H%M%S)
string_mon='mon'

if [ "$1" == "start" ]
then
	sudo airmon-ng start "$2"
	sudo timeout 50 airodump-ng -w /tmp/"$string_date" "$2$string_mon" 
	echo "$?"
elif [ "$1" == "stop" ]
then 
	sudo airmon-ng stop "$2$string_mon"
	echo "$?"
elif [ "$1" == "check" ]
then
	echo "ok"
	echo "$?"
else
	echo "Bad argument"
fi
