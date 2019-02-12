<!DOCTYPE html>
<html>
<body>

<h1>Tableau de bord du Scanner</h1>

<div class="grandeboite">
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
</div>


<?php
if(!empty($_GET["start"])){
	shell_exec("/var/www/html/project/creation_dbb.sh");

	$start=shell_exec('/var/www/html/project/launch_rtl.sh start 2>&1');
	//print_r($start);

	$toto=shell_exec('/var/www/html/project/launch_airodump.sh start wlan0 2>&1');
	print_r($toto);
	print_r("Bonjour2");


}elseif (!empty($_GET["stop"])) {
	$titi=shell_exec('/var/www/html/project/launch_rtl.sh stop');
	print_r($titi);

	$toutou=shell_exec('/var/www/html/project/launch_airodump.sh stop wlan0');
	print_r($toutou);

}elseif (!empty($_GET["status"])) {
	$stasta=shell_exec('/var/www/html/project/launch_rtl.sh status');
	print_r($stasta);

	$pinpin=shell_exec('/var/www/html/project/launch_airodump.sh status wlan1');
	print_r($pinpin);
}
?>

</body>
</html>
