<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
shell_exec('sudo /var/www/html/project/launch_rtl.sh stop 2>&1 >/var/www/html/project/debug.log');
shell_exec('sudo /var/www/html/project/launch_airodump.sh stop wlan0 2>&1 >>/var/www/html/project/debug.log');
shell_exec('sudo /var/www/html/project/launch_ble.sh stop 2>&1 >>/var/www/html/project/debug.log &');

?>
