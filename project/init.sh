#!/bin/bash

php creation_bdd_php.php

sudo /var/www/html/project/launch_rtl.sh start 2>&1 >>/var/www/html/project/debug.log
sudo /var/www/html/project/launch_airodump.sh start wlan1 2>&1 >>/var/www/html/project/debug.log
sudo /var/www/html/project/launch_ble.sh start 2>&1 >>/var/www/html/project/debug.log &
