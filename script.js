const api_URL ="https://newsapi.org/v2/everything?q="
const api_Key = "b24704a93d0c4f5487aadf8a9bd3f2ae";

window.addEventListener('load',()=> fetchNews());

async function fetchNews(inp){
    const response = await fetch(`${api_URL}${inp}&apiKey=${api_Key}`);
    const data = await response.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardContainer = document.getElementById("cards-container");
    const newsCardTemplete = document.getElementById("template-news-card");

    cardContainer.innerHTML='';

    articles.forEach(article =>{
        if(!article.urlToImage) return;
        const cardclone = newsCardTemplete.content.cloneNode(true);
        fillDataInCard(cardclone,article);
        cardContainer.appendChild(cardclone);
    })
}

function fillDataInCard(cardclone,article){
    const img = cardclone.querySelector('#news-img');
    const heading = cardclone.querySelector('#news-title');
    const source = cardclone.querySelector('#news-source');
    const desc = cardclone.querySelector('#news-desc');

    img.src = article.urlToImage;
    heading.innerHTML = article.title;
    desc.innerHTML = article.description; 

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });

    source.innerHTML = `${article.source.name} · ${date}`;

    cardclone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url);
    })
}

let curSelectedNav = null;

function onNavItemClick(id){
    fetchNews(id);
    // console.log("myself",id);
    
    const navItem = document.getElementById(id);
    // const allnavItem = document.getElementsByClassName("nav-item");
    active();
    navItem.classList.add('active');
    // curSelectedNav?.classList.remove('active');
    // curSelectedNav = navItem;
    // curSelectedNavclassList.add('active');
}

const searchInput = document.getElementById('Search-input');
// console.log(searchInput);
const searchButton = document.getElementById('Seacrh-btn');
// console.log(searchButton);

searchButton.addEventListener('click',() => {
    console.log(searchButton);
    const inp = searchInput.value;
    console.log(inp);
    if(!inp)  return;
    fetchNews(inp);

    active();

    // curSelectedNav?.classList.remove('active');
    // curSelectedNav = null;
});

function active(){
    const allnavItem = document.getElementsByClassName("nav-item");
    for(let i=0;i<allnavItem.length;i++){
        allnavItem[i].classList.remove('active');
    }
}