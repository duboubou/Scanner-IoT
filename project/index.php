<?php

  //echo $_GET['command'];

  //if($_GET['command'] === 'wifi'){
$out = shell_exec("/sbin/iwlist scanning");
$a = explode("\n",$out);
$essid="";
$address="";
for($i=0;$i<count($a);$i++){
  if(preg_match('/ESSID:/', $a[$i])){
    $b = explode(":",$a[$i]);
    $essid=$b[1];
  }
  if(preg_match('/Address:/', $a[$i])){
    $b = explode(":",$a[$i]);
    $address="$b[1]:$b[2]:$b[3]:$b[4]:$b[5]:$b[6]";
  }
  
 }

print "$essid,$address";
//print_r($a);
//}
?>
