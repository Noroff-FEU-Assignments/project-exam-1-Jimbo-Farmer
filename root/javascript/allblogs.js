const blogList = document.querySelector(".posts");
const url = "https://frontendfarmer.com/ProjectExam/wp-json/wp/v2/posts?_embed&per_page=100";
const loadMore = document.querySelector(".see-more");
const loadingIndicator = document.querySelector(".loading");

let tileQty = 8;
async function getPosts(){
    try { 
        const response = await fetch(url);
        const output = await response.json();
        
        function generateHtml(){
            blogList.innerHTML = ``;
            if(tileQty >= output.length){
                tileQty = output.length;
                loadMore.disabled = true;
            }
            loadingIndicator.classList.remove("loading");
            for(let i = 0; i < tileQty; i++){
                blogList.innerHTML += `<a class="post-tile" href="specificblog.html?id=${output[i].id}">
                <h2>${output[i].title.rendered}</h2>
                <img src="${output[i]._embedded['wp:featuredmedia']['0'].source_url}" alt="${output[i]._embedded['wp:featuredmedia']['0'].alt_text}">
                ${output[i].excerpt.rendered}
                
                </a>`
            }

        }
        generateHtml();  



        function generateExtraHtml(){
            let postsDone = document.querySelectorAll(".post-tile").length;
            if(postsDone + extraTileQty >= output.length){
                extraTileQty = output.length - postsDone;
                loadMore.disabled = true;
            }
            for(let i = postsDone; i < extraTileQty + postsDone; i++){
                blogList.classList.remove("loading");
                blogList.innerHTML += `<a class="post-tile" href="specificblog.html?id=${output[i].id}">
                <h2>${output[i].title.rendered}</h2>
                <img src="${output[i]._embedded['wp:featuredmedia']['0'].source_url}" alt="${output[i]._embedded['wp:featuredmedia']['0'].alt_text}">
                ${output[i].excerpt.rendered}
                </a>`
            }
            document.querySelectorAll(".post-tile")[postsDone].focus();  //set focus to the newly displayed posts so that keyboard users don't have to tab baack through all posts. 

        }
        
        loadMore.onclick = function(){
            extraTileQty = 4;
            generateExtraHtml();
        }     

    } catch (error) {
        console.log(error)
        blogList.classList.remove("loading");
        blogList.innerHTML =`<p>Apologies, an error has occurred</p>`;
    }
}
getPosts();