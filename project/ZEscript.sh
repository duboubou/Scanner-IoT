#!/bin/bash


while true; do
	/var/www/html/project/interval_ble.sh
	/var/www/html/project/interval_rtl.sh
	sudo /var/www/html/project/interval_wifi.sh
	
	echo 'Passage avant'
	/var/www/html/project/suppression_doublons.sh
	echo 'Passage après'
	php recuperation_bdd_php.php
	echo 'Passage après après'
	/var/www/html/project/suppr_crochets.sh 
	echo 'ca marche en boucle' 
	sleep 5
done