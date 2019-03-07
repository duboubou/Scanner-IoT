<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
shell_exec('sudo /var/www/html/project/interval_ble.sh');
shell_exec('sudo /var/www/html/project/interval_rtl.sh');
shell_exec('sudo /var/www/html/project/interval_wifi.sh');
?>
