#!/bin/bash
sudo hcitool lescan > $2 & 
sleep $1
sudo pkill --signal SIGINT hcitool
wait $pid
sort $2 | uniq > sansdoublons.txt

fichier="sansdoublons.txt"
while read -r line; do
adr=$(egrep -o "[A-Z0-9]{2}:[A-Z0-9]{2}:[A-Z0-9]{2}:[A-Z0-9]{2}:[A-Z0-9]{2}:[A-Z0-9]{2}" sansdoublons.txt > adresses.txt)
echo "MAC : $adr"
done < $fichier

adresses="adresses.txt"
while read -r line; do
#sudo hciconfig hci0 down
#sudo hciconfig hci0 up
gatt=$(gatttool -b "$adr" --primary)
echo "$gatt" >> primary.txt
done < $adresses


