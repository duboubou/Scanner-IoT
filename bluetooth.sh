#!/bin/bash
#sudo hcitool lescan > $2 & 
#sleep $1
#sudo pkill --signal SIGINT hcitool
#wait $pid
sort $2 | uniq > sansdoublons.csv

fichier="sansdoublons.csv"
while read -r line; do
adr=$(egrep -o "[A-Z0-9]{2}:[A-Z0-9]{2}:[A-Z0-9]{2}:[A-Z0-9]{2}:[A-Z0-9]{2}:[A-Z0-9]{2}" sansdoublons.csv > adresses.csv)
echo "MAC : $adr"
done < $fichier

adresses="adresses.csv"
while read -r line; do
#sudo hciconfig hci0 down
#sudo hciconfig hci0 up
info=$(sudo hcitool leinfo "$adr")
echo "$info" >> informations.csv
done < $adresses
