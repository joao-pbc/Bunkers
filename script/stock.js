
google.charts.load('current', {'packages':['table']});

let stockArray = [];
const options = { showRowNumber: true, width: '100%', height: '100%' };
const initialSearch = 'https://api.api-ninjas.com/v1/stockprice?ticker=A'
const baseUrl = 'https://api.api-ninjas.com/v1/stockprice?ticker='

window.addEventListener("load", () => {
    getStocks(initialSearch);
});

function getStocks(url){
    fetch(url, {
        method: 'GET',
        headers: {
            'X-Api-Key': 'zn0DLZGiNDA7Z1YSdhyL5g==G0AZmyj0xReSGJQh'
        }
    }).then(data => data.json())
    .then(responde => drawTable(responde));
}

function drawTable(stockData) {
    var data = new google.visualization.DataTable();
    stockArray.push(stockData)
    data.addColumn('string', 'Ticker');
    data.addColumn('number', 'Price');
    data.addColumn('string', 'Name');
    data.addColumn('string', 'Exchange');
    stockArray.forEach(element => {
        data.addRows([
            [element.ticker, element.price, element.name, element.exchange]
        ]);
    });
    var table = new google.visualization.Table(document.getElementById('stockContainer'));
    table.draw(data, options);
}

function search(){
    let input = document.getElementById('stockSearch');
    let url = baseUrl + input.value
    getStocks(url);
    input.value = ""
}
