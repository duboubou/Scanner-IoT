#!/bin/bash


while true; do
	/var/www/html/project/interval_ble.sh
	/var/www/html/project/interval_rtl.sh
	sudo /var/www/html/project/interval_wifi.sh
	php recuperation_bdd_php.php
	echo 'ca marche en boucle' 
	sleep 5
done
