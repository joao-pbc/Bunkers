const baseUrl = 'https://api.polygon.io/v2/reference/news?order=asc&limit=10&apiKey=yaUGohXC_M_7YWkMmYKnkAxKlZqS9o8I'

window.addEventListener('load', () => {
    getNews();
})

function getNews(){
    fetch(baseUrl, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => setUpInitialNews(data))
    .catch(err => console.log(err))

}

function setUpInitialNews(jsonObj){
    console.log(jsonObj)
    const newsWrapper = document.getElementById('panel')
    jsonObj.results.forEach(news => newsWrapper.appendChild(getNewsElement(news)));
}

function getNewsElement(news) {
    const div = document.createElement('div');
    div.onclick = function() {
        location.href = news.article_url
    }
    div.className = "news"

    const img = document.createElement('img');
    img.src = news.publisher.logo_url;
    img.style.maxWidth = '15%';

    const contentWraper = document.createElement('div')
    contentWraper.className = "contentWrapper";

    const preview = document.createElement('div');
    preview.innerText = news.title;

    const author = document.createElement('div');
    author.innerText = news.author;

    contentWraper.append(preview, author);
    

    div.append(img, contentWraper);
    return div;
}


function changeLightMode(isDarkMode) {
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
}