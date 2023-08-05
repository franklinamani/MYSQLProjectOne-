<?php
$username = "cmpt310";
$password = "w2qa=m";
$server   = "db";
$schema   = "Lab1";

$across = array(
  1  => "SELECT 'BALSA' as `Word`;",
  6  => "SELECT Word FROM D WHERE ID=9017; ",
  10 => "SELECT Word FROM A WHERE ID= 14",
  14 => "SELECT Word FROM B WHERE ID= 10",
  15 => "SELECT Word FROM C WHERE ID= 103",
  16 => "SELECT Word FROM C WHERE ID= 112",
  17 => "SELECT Word FROM B WHERE ID= 18",
  20 => "SELECT Word FROM B WHERE ID= 6",
  21 => "SELECT Word FROM D WHERE ID= 9014",
  22 => "SELECT Word FROM A WHERE ID= 13",
  25 => "SELECT Word FROM A WHERE ID= 15",
  26 => "SELECT Word FROM D WHERE ID= 9002",
  30 => "SELECT Word FROM D WHERE ID= 9015",
  32 => "SELECT Word FROM A WHERE ID= 9",
  35 => "SELECT Word FROM A WHERE ID= 6",
  41 => "SELECT Word FROM C WHERE ID= 113",
  43 => "SELECT Word FROM A WHERE ID= 2",
  44 => "SELECT Word FROM C WHERE ID= 115",
  45 => "SELECT Word FROM D WHERE ID= 9013",
  47 => "SELECT Word FROM D ORDER BY `Word` ASC LIMIT 1 OFFSET 12;",
  48 => "SELECT Word FROM B ORDER BY `Word` ASC LIMIT 1 OFFSET 7",
  53 => "SELECT Word FROM A ORDER BY `Word` ASC LIMIT 1 OFFSET 12",
  56 => "SELECT Word FROM C ORDER BY `Word` ASC LIMIT 1 OFFSET 0",
  58 => "SELECT Word FROM D ORDER BY `Word` ASC LIMIT 1 OFFSET 7",
  63 => "SELECT Word FROM B ORDER BY `Word` DESC LIMIT 1 OFFSET 12",
  66 => "SELECT Word FROM B ORDER BY `Word` ASC LIMIT 1",
  67 => "SELECT Word FROM D ORDER BY `Word` DESC LIMIT 1 OFFSET 14",
  68 => "SELECT Word FROM C ORDER BY `Word` DESC LIMIT 1 OFFSET 2",
  69 => "SELECT Word FROM B ORDER BY `Word` DESC LIMIT 1 OFFSET 6",
  70 => "SELECT Word FROM C ORDER BY `Word` DESC LIMIT 1 OFFSET 16",
  71 => "SELECT Word FROM B WHERE ID=(SELECT ID FROM A WHERE `Word` = 'IDES' )",
);

$down = array(
  1  => "SELECT 'BABU' as `Word`;",
  2  => "SELECT Word FROM C WHERE ID=100",
  3  => "SELECT Word FROM C WHERE ID=111",
  4  => "SELECT Word FROM C WHERE ID=102",
  5  => "SELECT Word FROM D WHERE ID=9001",
  6  => "SELECT Word FROM D WHERE ID=9000",
  7  => "SELECT Word FROM A WHERE ID=8",
  8  => "SELECT Word FROM A WHERE ID=1",
  9  => "SELECT Word FROM D WHERE ID=9016",
  10 => "SELECT Word FROM D WHERE ID=9006",
  11 => "SELECT Word FROM D WHERE ID=9007",
  12 => "SELECT Word FROM A WHERE ID=19",
  13 => "SELECT Word FROM B WHERE ID=5",
  18 => "SELECT Word FROM A WHERE ID=17",
  19 => "SELECT Word FROM A WHERE ID=11",
  23 => "SELECT Word FROM D WHERE ID=9009",
  24 => "SELECT Word FROM C WHERE ID=108",
  26 => "SELECT Word FROM C WHERE ID=101",
  27 => "SELECT Word FROM B WHERE ID=8",
  28 => "SELECT Word FROM D WHERE ID=9008",
  29 => "SELECT Word FROM A WHERE ID=16",
  31 => "SELECT Word FROM C WHERE ID=105",
  33 => "SELECT Word FROM A WHERE ID=12",
  34 => "SELECT Word FROM A WHERE ID=4",
  36 => "SELECT Word FROM B WHERE ID=9",
  37 => "SELECT Word FROM C WHERE ID=107",
  38 => "SELECT Word FROM D WHERE ID=9018",
  39 => "SELECT Word FROM A WHERE ID=3",
  40 => "SELECT Word FROM B WHERE ID=11",
  42 => "SELECT Word FROM B WHERE ID=12",
  46 => "SELECT Word FROM D WHERE ID=9003",
  48 => "SELECT Word FROM C WHERE ID=109",
  49 => "SELECT Word FROM B ORDER BY `Word` ASC LIMIT 1 OFFSET 1;",
  50 => "SELECT Word FROM C ORDER BY `Word` DESC LIMIT 1 OFFSET 13",
  51 => "SELECT Word FROM C ORDER BY `Word` ASC LIMIT 1 OFFSET 6",
  52 => "SELECT Word FROM A ORDER BY `Word` ASC LIMIT 1 OFFSET 15",
  54 => "SELECT Word FROM D ORDER BY `Word` ASC LIMIT 1",
  55 => "SELECT Word FROM A ORDER BY `Word` DESC LIMIT 1",
  57 => "SELECT Word FROM A ORDER BY `Word` DESC LIMIT 1 OFFSET 12",
  59 => "SELECT Word FROM B ORDER BY `Word` DESC LIMIT 1 OFFSET 7",
  60 => "SELECT Word FROM C ORDER BY `Word` ASC LIMIT 1 OFFSET 12",
  61 => "SELECT Word FROM B WHERE ID=(SELECT ID FROM C WHERE `Word` = 'ASEA')-100 ",
  62 => "SELECT Word FROM C WHERE ID=(SELECT ID FROM D WHERE `Word` = 'RASP' )-8900",
  64 => "SELECT Word FROM B WHERE ID=(SELECT ID FROM D WHERE `Word`= 'RASP' )-9000",
  65 => "SELECT Word FROM D WHERE ID=(SELECT ID FROM A WHERE `Word` = 'TOAST' )+9000",
);
// DO NOT MODIFY BELOW THIS POINT ---------------------------------------------

function openDB()
{
  try
  {
    $mysqli = new mysqli($GLOBALS['server'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['schema'], 3306);
    if ($mysqli->connect_errno)
      echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
    else
      echo "Connected to " . $mysqli->host_info . "\n";
    return $mysqli;
  }
  catch (mysqli_sql_exception $e)
  {
    echo "Failed to connect to MySQL: ".$e->getMessage()."\n";
  }
  return NULL;
}

function closeDB($mysqli)
{
  $mysqli->close();
}

function getAnswers($questions, $mysqli)
{
  foreach ($questions as $num => $query) {
    $resultString = "";
    if (!empty($query)) {
      $result = $mysqli->query($query);
      if ($result) {
        if ($result->num_rows != 1)
          $outcome = "failure";
        else
          $outcome = "success";
        $resultString = $result->fetch_assoc();
        $resultString = $resultString['Word'];
      } else {
        $outcome = "failure";
        if (!empty($query))
          $resultString = "Error: " . "[" . $mysqli->errno . "] " . $mysqli->error;
      }
    } else {
      $outcome = "failure";
    }
    // Added "index" and "word" classes to get them with JavaScript for the board display
    echo "<tr><td class=\"index\" id=\"number\">$num</td><td class=\"word\" id=\"answer\">$resultString</td><td id=\"query\" class=\"$outcome\">$query</td>\n";
  }
}
