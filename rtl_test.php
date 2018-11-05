<!DOCTYPE html>
<html>
<body>

<h1>TEST RTL_433</h1>

<?php
/**
 * Execute the given command by displaying console output live to the user.
 *  @param  string  cmd          :  command to be executed
 *  @return array   exit_status  :  exit status of the executed command
 *                  output       :  console output of the executed command
 */
function liveExecuteCommand($cmd)
{

    while (@ ob_end_flush()); // end all output buffers if any

    $proc = popen("$cmd 2>&1 ; echo Exit status : $?", 'r');

    $live_output     = "";
    $complete_output = "";

    while (!feof($proc))
    {
        $live_output     = fread($proc, 4096);
        $complete_output = $complete_output . $live_output;
        //echo "$live_output";


        $a=explode("\n", $live_output);

        $array[] = null;

        foreach ($a as $string) {
          // code...
          array_push($array,$a);

          echo "<pre>";

            print_r($array);
            echo "</pre>";

        }

/*
$test="";
  for ($i=0; $i < count($array) ; $i++) {
    // code...
    if (preg_match("/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}",$array[$i])) {
      // code...
      $b=explode("\n",$array[$i]);
      $test="$b[0]\n $b[1]\n $b[2]\n $b[3]\n $b[4]\n $b[5]\n $b[6]\n";
    }
  }
print"$test";
*/

        @ flush();
    }

    pclose($proc);

    // get exit status
    preg_match('/[0-9]+$/', $complete_output, $matches);

    // return exit status and intended output
    return array (
                    'exit_status'  => intval($matches[0]),
                    'output'       => str_replace("Exit status : " . $matches[0], '', $complete_output)
                 );
}

$result = liveExecuteCommand('rtl_433 -G -q');

if($result['exit_status'] === 0){
   // do something if command execution succeeds
} else {
    // do something on failure
}

?>


</body>
</html>
