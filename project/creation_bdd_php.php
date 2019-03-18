<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
shell_exec('/var/www/html/project/creation_dbb.sh 2>&1 >>/var/www/html/project/debug.log');

?>
