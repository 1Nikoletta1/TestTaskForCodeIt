/**
 * Created by veronika on 10.11.16.
 */

var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

var xhr = new XHR();

xhr.open('GET', 'http://codeit.pro/frontTestTask/company/getList', true);

xhr.onload = function() {
    var text = JSON.parse(this.responseText);
    showItems(text);
}

xhr.onerror = function() {
    alert( 'Ошибка ' + this.status );
}

xhr.send();


function showItems(responseText) {

    var companyList = document.querySelector('#list article');
    var totalCompanies = document.querySelector('#total article #circle');
    var companies = [];

    for (var i=0; i<responseText.list.length; i++) {

        //список всех компаний
        companyList.innerHTML += '<p>' + responseText.list[i].name + '</p>';

        //общее количество компаний
        totalCompanies.innerHTML = '<p>' + responseText.list.length + '</p>';

        //add companies to the array
        companies.push( responseText.list[i].location.name );

    }

    function _calcRepeatElems(arr) {

        var resultArr = [],
            b = 0;

        for (var i = 0; i < arr.length; i++) {
            var k = 0,
                count = 1;

            while (k < b && resultArr[k][0] !== arr[i])
                k++;

            if (k === b) {
                for (var j = i+1; j < arr.length; j++) {
                    if (arr[i] === arr[j])
                        count++;
                }

                resultArr[b++] = [
                    arr[i],
                    count
                ];
            }
        }

        return resultArr;
    }

    function _drawChart() {

        var data = google.visualization.arrayToDataTable(
            this.res
        );

        var options = {
            title: ''
        };

        var chart = new google.visualization.PieChart(document.getElementById('chart'));

        chart.draw(data, options);
    }

    this.res = _calcRepeatElems(companies);

    var header = ['Task', 'Hours per Day'];
    this.res.unshift(header);

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(_drawChart);

}


