<!DOCTYPE html>
<html>
<body>

<h1>TEST RTL avec shell</h1>

<form action="rtl-php-sh.php" method="get">
 <input type="hidden" name="start" value="start">
 <input type="submit" value="Démarrer le scan">
</form>

<form action="rtl-php-sh.php" method="get">
 <input type="hidden" name="stop" value="stop">
 <input type="submit" value="Arreter le scan">
</form>

<form action="rtl-php-sh.php" method="get">
 <input type="hidden" name="status" value="status">
 <input type="submit" value="Status">
</form>

<?php
if(!empty($_GET["start"])){
  $start=shell_exec('/var/www/html/script_rtl.sh start 2>&1');
//  print_r($start);
//  echo "<pre>$start</pre>";

  //sleep(50);

  $cut=shell_exec('/var/www/html/cut.sh');
  $db=shell_exec('/var/www/html/load.sh');

}elseif (!empty($_GET["stop"])) {
  $stop=shell_exec('/var/www/html/script_rtl.sh stop');
  print_r($stop);
}elseif (!empty($_GET["status"])) {
  $status=shell_exec('/var/www/html/script_rtl.sh status');
  print_r($status);
}
?>

</body>
</html>