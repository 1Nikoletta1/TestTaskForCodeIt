function Panel() {

    var totalCompanies = document.querySelector('#total article #circle');
    var companyList = document.querySelector('#list article');
    var partners = document.querySelector('#partners article');
    var companies = [];
    var lastClicked = null;

    var position = 0;
    var carousel = document.getElementById('carousel');

    this.createXHR = function() {

        var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

        var xhr = new XHR();

        xhr.open('GET', 'http://codeit.pro/frontTestTask/company/getList', true);

        xhr.onload = function () {
            var text = JSON.parse(this.responseText);

            calcTotalCompanies(text);
            showListOfCompanies(text);
            createArr(text);
            showCompaniesByLocation();

            companyList.onclick  = function(responseText) {
                var target = event.target;

                if (target.tagName != 'P') return;

                document.querySelector('#partners').style.display = 'block';

                var newArr = createArr(text);
                partners.innerHTML = '';

                for (var i=0; i<newArr.length; i++) {
                    if(newArr[i].name == responseText.target.innerHTML) {
                        for (var k=0; k<newArr[i].partners.length; k++) {
                            partners.innerHTML += '<p>' + newArr[i].partners[k] + '</p>';
                        }
                    }
                }

                lastClicked = target;
            };

        };

        xhr.onerror = function () {
            alert('Ошибка ' + this.status);
        };

        xhr.send();
    };

    this.createXHRNews = function() {

        var XHRNews = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

        var xhrNews = new XHRNews();

        xhrNews.open('GET', 'http://codeit.pro/frontTestTask/news/getList', true);

        xhrNews.onload = function() {
            var text = JSON.parse(this.responseText);
            showNews(text);

            carousel.addEventListener('click', pressCarouselBtn)
        };

        xhrNews.onerror = function() {
            alert( 'Ошибка ' + this.status );
        };

        xhrNews.send();

    };

    function calcTotalCompanies(responseText) {
        totalCompanies.innerHTML = '<p>' + responseText.list.length + '</p>';
    }

    function showListOfCompanies(responseText) {
        for (var i=0; i<responseText.list.length; i++) {
            companyList.innerHTML += '<p class="companyName">' + responseText.list[i].name + '</p>';
        }
    }

    function showCompaniesByLocation() {

        this.res = calcRepeatElems(companies);

        var header = ['Task', 'Hours per Day'];
        this.res.unshift(header);

        //Draw chart with Google Charts
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);

    }

    function createArr (responseText) {

        var totalArr =[];
        var partnersArr =[];
        var partnerObj ={};

        for (var i=0; i<responseText.list.length; i++) {
            //Add companies to the array companies
            companies.push( responseText.list[i].location.name );

            for (var j=0; j<responseText.list[i].partners.length; j++) {
                partnersArr.push(responseText.list[i].partners[j].name);
            }

            partnerObj = {
                name: responseText.list[i].name,
                partners: partnersArr
            };

            totalArr.push(partnerObj);
            partnersArr = [];
        }

        return totalArr;

    }

    function calcRepeatElems(arr) {

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

    function drawChart() {

        var data = google.visualization.arrayToDataTable(
            this.res
        );

        var options = {
            title: ''
        };

        var chart = new google.visualization.PieChart(document.getElementById('chart'));

        chart.draw(data, options);
    }

    function showNews(responseText) {

        var news = document.querySelector('#news #scroll-images');
        var date = new Date();
        var options = {
            year: 'numeric',
            day: 'numeric',
            month: 'numeric'
        };

        for (var i=0; i < responseText.list.length; i++) {

            var oneNew = document.createElement('div');
            oneNew.className = "oneNew";
            news.appendChild(oneNew);

            oneNew.innerHTML += '<img src=' + responseText.list[i].img + '>';

            oneNew.innerHTML += '<p class="size">' + responseText.list[i].description + '</p>';

            oneNew.innerHTML += '<span><b>Author: </b>' + responseText.list[i].author + '</span>';

            var timestamp = responseText.list[i].date;
            date.setTime(timestamp);
            oneNew.innerHTML += '<span><b>Public: </b>' + date.toLocaleString('ru', options)  + '</span>';

        }

    }

    function pressCarouselBtn (event) {

        var target = event.target;

        while (target != this) {
            if (target.nodeName == 'BUTTON') {
                scrollCarousel(target);
                return false;
            }
            target = target.parentNode;
        }
    }

    function scrollCarousel(target) {

        var width = 400; // ширина изображения
        var count = 1; // количество изображений


        var list = carousel.querySelector('#scroll-images');
        var listElems = carousel.querySelectorAll('.oneNew');

        if ( target.classList.contains('prev') ) {

            position = Math.min(position + width * count, 0);
            list.style.marginLeft = position + 'px';


        } else if ( target.classList.contains('next') ) {

            position = Math.max(position - width * count, -width * (listElems.length - count));
            list.style.marginLeft = position + 'px';

        }
    }

}

var panel = new Panel();
panel.createXHR();
panel.createXHRNews();