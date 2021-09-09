const latestPosts = document.querySelector(".posts")
const url = "https://frontendfarmer.com/ProjectExam/wp-json/wp/v2/posts?_embed&per_page=100";


const previousButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");
previousButton.disabled = true;

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

// Function to reload page if page width changes
window.addEventListener('resize', function(){
    if(window.innerWidth > w || window.innerWidth < w){   
        let reload = setTimeout(function(){
            window.location.reload();
        }, 1000);
        reload();
    }    
});

let blocks;   // declare variable for number of blocks that will contain post tiles. 
let windowWidth; //Will contain width of carousel element to allow repositioning of carousel items. 

async function getPosts(){
    try { 
        const response = await fetch(url);
        const output = await response.json();
        
        function generateBlocks(){
            latestPosts.classList.remove("loading");
            latestPosts.innerHTML =``;
            windowWidth = latestPosts.scrollWidth;  //Needed later for previous and next buttons to slide content left and right. 
            blocks = Math.ceil(output.length / tiles); //Number of carousel blocks is total blogs divided by number of tiles on a page. 
            for(let i = 0; i < blocks; i ++){
                latestPosts.innerHTML += `<div class="tile-block">
                </div>`
            }
        }
        generateBlocks();  
        
        const tileBlocks = document.querySelectorAll(".tile-block"); 

        function generateTiles(){
            let indexStart = 0;
            let indexStop = tiles;
            for(let i = 0; i < blocks; i++){
                for(let j = indexStart; j < indexStop; j++){
                    if(j >= output.length){
                        break;
                    }
                    tileBlocks[i].innerHTML += `<div class=post-tile block_${i}>
                    <h2>${output[j].title.rendered}</h2>
                    <img src="${output[j]._embedded['wp:featuredmedia']['0'].source_url}">
                    ${output[j].excerpt.rendered}
                    <a href="specificblog.html?id=${output[j].id}">Read More</a>
                    </div>` 
                }
                indexStart += tiles;
                indexStop += tiles;
            }
        }
        generateTiles();

        let position = 0;
        nextButton.addEventListener("click", function(){
            position += windowWidth;
            previousButton.disabled = false;
            for(let i= 0; i < tileBlocks.length; i++){
                tileBlocks[i].style.transform = "translateX(-"+position+"px)"
            }
            console.log(position)
            if(position === (blocks -1) * windowWidth){
                nextButton.disabled = true;
            }
        })
        
        previousButton.addEventListener("click", function(){
            position -= windowWidth;
            nextButton.disabled = false;
            for(let i= 0; i < tileBlocks.length; i++){
                tileBlocks[i].style.transform = "translateX(-"+position+"px)"
            }
            if(position === 0){
                previousButton.disabled = true;
            } 
        }) 
        
        

        

    } catch(error) {
        latestPosts.classList.remove("loading");
        latestPosts.innerHTML =`<p>Apologies, an error has occurred</p>`;
        console.log(error);
    }
}
getPosts();