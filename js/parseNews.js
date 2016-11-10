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
    var news = document.querySelector('#news article');

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