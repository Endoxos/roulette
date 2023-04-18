<?php
// variables
require_once('SOURCE/VIEW/CONTROLLER_STATS.php');
$ID_CLASSE = $_POST['ID_CLASSE'];

// récupération des moyennes de la classe
$roulette = new Roulette();
$data_array = $roulette->getMoyenneClasse($ID_CLASSE);
$data_js = json_encode($data_array); // conversion du tableau PHP en tableau JSON pour le JS

include ('SOURCE/MODEL/STATS/stats.html');

?>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javascript">
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable(<?php echo $data_js; ?>);

    var options = {
      title: 'Moyenne des élèves de la classe',
      legend: { position: 'none' },
      histogram: { bucketSize: 0.5, minValue: 0, maxValue: 20 },
      hAxis: {
      minValue: 0,
      maxValue: 20,
      ticks: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20]
      }
    };

    var chart = new google.visualization.Histogram(document.getElementById('chart_div'));
    chart.draw(data, options);
  }
</script>

<?php
include ('SOURCE/MODEL/STATS/footer.html');
?>
