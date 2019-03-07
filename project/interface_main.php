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

function mysql_insert ($sql)
{

    $base = mysql_connect ('localhost', 'user_iot', '');
    mysql_select_db ('db_projet_iot', $base);
    //$sql = 'INSERT INTO liste_proprietaire VALUES ("", "tibo", "06-98-42-01-36")';

    // on insere le tuple (mysql_query) et au cas où, on écrira un petit message d'erreur si la requête ne se passe pas bien (or die)
    mysql_query ($sql) or die ('Erreur SQL !'.$sql.'<br />'.mysql_error());

    // on ferme la connexion à la base
    mysql_close();
}

//mysql_insert("INSERT INTO table_Historique VALUES ('2019-01-02 12:25:36', '102', '52','63','12', NULL)");

function mysql_requete($req) 
{
	
	$connect = mysqli_connect("localhost","user_iot","","db_projet_iot");
	$result = mysqli_query($connect, $req);
	$json_array = array();
	while($row = mysqli_fetch_assoc($result))
	{
		$json_array[] = $row;
	}
	return json_encode($json_array);
}

function json_post($result, $nom_du_fichier)
{

	// Ouverture du fichier
	$fichier = fopen($nom_du_fichier, 'w+');
	chmod($fichier, 0777);

	// Ecriture dans le fichier
	fwrite($fichier, $result);

	// Fermeture du fichier
	fclose($fichier);
}


$today = date("Y-m-d H:i:s"); 
print_r($today);

if(!empty($_GET["start"])){

	$dbb=shell_exec('sudo /var/www/html/project/creation_dbb.sh 2>&1 >>/var/www/html/project/debug.log');
	print_r($dbb);

	$start=shell_exec('sudo /var/www/html/project/launch_rtl.sh start 2>&1 >>/var/www/html/project/debug.log');
	print_r($start);

	//$toto=shell_exec('sudo /var/www/html/project/launch_airodump.sh start wlan0 2>&1 >>/var/www/html/project/debug.log');
	//print_r($toto);

	$tata=shell_exec('sudo /var/www/html/project/launch_ble.sh start 2>&1 >>/var/www/html/project/debug.log &');
	print_r($tata);


}elseif (!empty($_GET["stop"])) {
	$titi=shell_exec('sudo /var/www/html/project/launch_rtl.sh stop');
	print_r($titi);

	$toutou=shell_exec('sudo /var/www/html/project/launch_airodump.sh stop wlan0');
	print_r($toutou);


	$tout=shell_exec('sudo /var/www/html/project/launch_ble.sh stop');
	print_r($tout);

}elseif (!empty($_GET["status"])) {
	$stasta=shell_exec('sudo /var/www/html/project/launch_rtl.sh status');
	print_r($stasta);

	$pinpin=shell_exec('sudo /var/www/html/project/launch_airodump.sh status wlan0');
	print_r($pinpin);

	$pinp=shell_exec('sudo /var/www/html/project/launch_ble.sh status');
	print_r($pinp);
}



json_post(mysql_requete("SELECT * FROM table_Accesspoint"),'/var/www/html/project/dossier_json/req_tab_wifi1.json');
json_post(mysql_requete("SELECT bssid, essid, privacy, nb_sta_co FROM table_Accesspoint"),'/var/www/html/project/dossier_json/req_tab_wifi2.json');
//json_post(mysql_requete("SELECT * FROM table_Stations WHERE macaddr_sta =inputuser AND last_time_sta > \"$today\""),'/var/www/html/project/dossier_json/req_info_wifi.json');
json_post(mysql_requete("SELECT COUNT(*) FROM table_Accesspoint WHERE last_time_seen > \"$today\""), '/var/www/html/project/dossier_json/req_cam1.json');
json_post(mysql_requete("SELECT COUNT(*) FROM table_Stations WHERE last_time_sta > \"$today\""), '/var/www/html/project/dossier_json/req_cam2.json');
json_post(mysql_requete("SELECT COUNT(*) FROM table_Rtl WHERE timestamp > \"$today\""), '/var/www/html/project/dossier_json/req_cam3.json');
json_post(mysql_requete("SELECT COUNT(*) FROM table_Bluetooth WHERE last_time_ble > \"$today\""), '/var/www/html/project/dossier_json/req_cam4.json');
json_post(mysql_requete("SELECT macaddr_ble,nom_ble, manufacturer FROM table_Bluetooth WHERE last_time_ble > \"$today\""), '/var/www/html/project/dossier_json/req_tab_ble1.json');

//Pour les historiques

?>

</body>
</html>