/**
 * Created by veronika on 10.11.16.
 */
var XHRNews = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

var xhrNews = new XHRNews();

xhrNews.open('GET', 'http://codeit.pro/frontTestTask/news/getList', true);

xhrNews.onload = function() {
    var text = JSON.parse(this.responseText);
    showNews(text);
}

xhrNews.onerror = function() {
    alert( 'Ошибка ' + this.status );
}

xhrNews.send();

function showNews(responseText) {

    console.log(responseText);

    //получить список новостей
    var news = document.querySelector('#news #scroll-images');

    var article = [];
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


/*-----------------------
 ------carousel-area------
 ----------------------*/

var position = 0; // текущий сдвиг влево
var carousel = document.getElementById('carousel');

carousel.onclick = function(event) {

    var target = event.target;

    while (target != this) {
        if (target.nodeName == 'BUTTON') {
            scrollCarousel(target);
            return false;
        }
        target = target.parentNode;
    }
};

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