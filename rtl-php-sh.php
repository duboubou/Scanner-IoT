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
  $cut=shell_exec('/var/www/html/cut.sh');
  $db=shell_exec('/var/www/html/load.sh');

  sleep(5);

  $con=mysqli_connect("localhost","bryan","podium123","projet");
  if(mysqli_connect_errno())
	{
	  echo "Failed" . mysqli_connect_errno();
	}

  $result=mysqli_query($con,"SELECT * FROM rtl");

  echo "<table border='1'>
  <tr>
  <th>Timestamp</th>
  <th>Device</th>
  <th>Temperature</th>
  <th>Humidity</th>
  <th>Rain</th>
  <th>Pressure</th>
  </tr>";

  while($row = mysqli_fetch_array($result))
	{
	  echo "<tr>";
	  echo "<td>" . $row['timestamp'] . "</td>";
	  echo "<td>" . $row['device'] . "</td>";
	  echo "<td>" . $row['temperature'] . "</td>";
	  echo "<td>" . $row['humidity'] . "</td>";
	  echo "<td>" . $row['rain'] . "</td>";
	  echo "<td>" . $row['pressure'] . "</td>";
	  echo "</tr>";
	}
	echo "</table>";

  mysqli_close($con);

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