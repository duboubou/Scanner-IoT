<?php
//header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Methods: *");
//header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
echo 'ftg2';
shell_exec('/var/www/html/project/interval_ble.sh');
echo 'ftg3';
shell_exec('/var/www/html/project/interval_rtl.sh');
echo 'ftg4';
shell_exec('/var/www/html/project/interval_wifi.sh');
echo 'ftg5';
?>
