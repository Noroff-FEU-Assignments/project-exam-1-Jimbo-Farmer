const latestPosts = document.querySelector(".latest-posts")
const url = "https://frontendfarmer.com/ProjectExam/wp-json/wp/v2/posts?_embed&per_page=100";


const previousButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");

let w = window.innerWidth;
let tiles;
let firstTile;

if(w < 600){
    tiles = 1;
} else if(w >= 600 && w < 1000){
    tiles = 2;
} else if(w >= 1000 && w < 1400){
    tiles = 3;
} else {
    tiles = 4;
}

window.addEventListener('resize', function(){
    let reload = setTimeout(function(){
        window.location.reload();
    }, 1000);
    reload();
});


async function getPosts(){
    try { 
        const response = await fetch(url);
        const output = await response.json();
        console.log(output);
        firstTile = 0;
        
        function generateHtml(){
            latestPosts.innerHTML =``;
            if((firstTile + tiles) >= output.length){
                firstTile = output.length - tiles;
                nextButton.disabled = true;
            } else if(firstTile <= 0){
                firstTile = 0;
                previousButton.disabled = true;
            } else {
                nextButton.disabled = false;
                previousButton.disabled = false;
            }

            for(let i = firstTile; i < (firstTile + tiles); i++){
                latestPosts.innerHTML += `<div class=post-tile>
                <h2>${output[i].title.rendered}</h2>
                <img src="${output[i]._embedded['wp:featuredmedia']['0'].source_url}">
                <p>${output[i].excerpt.rendered}</p>
                <a href="specificblog.html?id=${output[i].id}">Read More</a>
                </div>`
            }
        }
        generateHtml();  
        
        nextButton.addEventListener("click", function(){
            firstTile += tiles;
            generateHtml();
        })
        
        previousButton.addEventListener("click", function(){
            firstTile -= tiles;
            generateHtml();
        })


        
        
    } catch (error) {
        
    }
}
getPosts();