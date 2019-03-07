<?php

//echo $_GET['command'];
//if($_GET['command']== 'bluetooth'){

//$out = shell_exec("/home/esme/bluez-5.41/tools/hcitool dev");
$out = shell_exec ("/var/www/html/project/bluetooth.sh");
//$out = shell_exec("hcitool dev");
//echo "$out";
//$out >> /var/www/html/project/test.csv ;
//list($name, $mac)=explode(":", $out);
//$a = explode (" ",$out);
//$name ="";
//$adr ="";
//for($i=0;$i<count($a);$i++){
//	if(preg_match('/Devices:/' , $a[$i])){
//	$b = explode(":", $a[$i]);
//	$name =$b[1];
//	$adr ="$b[2]:$b[3]:$b[4]:$b[5]:$b[6]:$b[7]";
//	}
//}

//echo "name = $name";
//echo "mac adress = $adr";


?>
