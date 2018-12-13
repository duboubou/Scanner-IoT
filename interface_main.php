<!DOCTYPE html>
<html>
<body>

<h1>Tableau de bord du Scanner</h1>

<form action="interface_main.php" method="get">
 <input type="hidden" name="start" value="start">
 <input type="submit" value="Démarrer le scan">
</form>

<form action="interface_main.php" method="get">
 <input type="hidden" name="stop" value="stop">
 <input type="submit" value="Arreter le scan">
</form>

<form action="interface_main.php" method="get">
 <input type="hidden" name="status" value="status">
 <input type="submit" value="Status">
</form>

<?php
if(!empty($_GET["start"])){
	$tata=shell_exec('/var/www/html/project/creation_dbb.sh');
	print_r($tata);

	$start=shell_exec('/var/www/html/project/launch_rtl.sh start 2>&1');
	print_r($start);
  	print_r("Bonjour");
	$toto=shell_exec('/var/www/html/project/launch_airodump.sh start wlo1');
	print_r($toto);


}elseif (!empty($_GET["stop"])) {
	$titi=shell_exec('/var/www/html/project/launch_rtl.sh stop');
	print_r($titi);

	$toutou=shell_exec('/var/www/html/project/launch_airodump.sh stop wlo1');
	print_r($toutou);

}elseif (!empty($_GET["status"])) {
	$stasta=shell_exec('/var/www/html/project/launch_rtl.sh status');
	print_r($stasta);

	$pinpin=shell_exec('/var/www/html/project/launch_airodump.sh check wlo1');
	print_r($pinpin);
}
?>

</body>
</html>
