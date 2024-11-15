google.charts.load('current', { 'packages': ['corechart'] });
const sheetId = "1V1Wc4eAkGOfuvWOiLdKAHf1qXKcuuOHF71RfkY4faMc";
const sheetName = encodeURIComponent("finance");
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

let pieObject;
let lineObject;


window.addEventListener("load", () => {
    drawChart();
});


async function drawChart() {
    const data = await getDataFromSheet();
    drawLineChart(data);
    drawPieChart(data);
}

function drawLineChart(data){
    let options = getLineChartOptions();
    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    chart.draw(data, options);
    lineObject = {data, options}
}

function drawPieChart(data) {
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Work',     11],
      ['Eat',      2],
      ['Commute',  2],
      ['Watch TV', 2],
      ['Sleep',    7]
    ]);

    var options = getPieChartOptions();

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);

    pieObject = {data, options}
}

function getDataTable(data) {
    var dataTable = new google.visualization.DataTable();

    dataTable.addColumn('date', 'Data'); 
    dataTable.addColumn('number', 'Valor');  
    dataTable.addColumn('number', 'Total');  

    data.forEach(function(item) {
      const dateParts = item.Data.split('/');
      const formattedDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

      const valor = parseFloat(item.Valor);
      const total = item.Total === "" ? null : parseFloat(item.Total);

      dataTable.addRow([formattedDate, valor, total]);
    });

    return dataTable;
}

function changeChartLighMode() {
    var lineChart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    lineChart.draw(lineObject.data, getLineChartOptions());

    var pieChart = new google.visualization.PieChart(document.getElementById('piechart'));
    pieChart.draw(pieObject.data, getPieChartOptions());
}

function getLineChartOptions() {
    let root = document.documentElement;
    let background = getComputedStyle(root).getPropertyValue('--background-color').trim();
    let textColor = getComputedStyle(root).getPropertyValue('--text-color').trim();
    var options = {
        title: 'Company Performance',
        curveType: 'function',
        legend: { position: 'bottom' },
        backgroundColor: background,
        titleTextStyle: {
            color: textColor,
        },
        hAxis: {
            titleTextStyle: {
                color: textColor
            },
            textStyle: {
                color: textColor
            }
        },
        vAxis: {
            titleTextStyle: {
                color: textColor
            },
            textStyle: {
                color: textColor
            }
        },
        legend: {
            position: 'bottom',
            textStyle: {
                color: textColor
            }
        }

    };

    return options;
}

function getPieChartOptions(){
    let root = document.documentElement;
    let background = getComputedStyle(root).getPropertyValue('--background-color').trim();
    let textColor = getComputedStyle(root).getPropertyValue('--text-color').trim();
    var options = {
        title: 'Company Performance',
        curveType: 'function',
        legend: { position: 'bottom' },
        backgroundColor: background,
        titleTextStyle: {
            color: textColor,
        },
        legend: {
            position: 'bottom',
            textStyle: {
                color: textColor
            }
        }
    };
    return options;
}