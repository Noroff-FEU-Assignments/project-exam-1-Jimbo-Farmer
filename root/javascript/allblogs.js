const blogList = document.querySelector(".posts");
const url = "https://frontendfarmer.com/ProjectExam/wp-json/wp/v2/posts?_embed&per_page=100";
const loadMore = document.querySelector(".see-more");

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
            for(let i = 0; i < tileQty; i++){
                blogList.classList.remove("loading");
                blogList.innerHTML += `<div class=post-tile>
                <h2>${output[i].title.rendered}</h2>
                <img src="${output[i]._embedded['wp:featuredmedia']['0'].source_url}">
                <p>${output[i].excerpt.rendered}</p>
                <a href="specificblog.html?id=${output[i].id}">Read More</a>
                </div>`
            }

        }
        generateHtml();  
        
        loadMore.onclick = function(){
            tileQty += 4;
            generateHtml();
        }   
        
    } catch (error) {
        console.log(error)
        blogList.classList.remove("loading");
        blogList.innerHTML =`<p>Apologies, an error has occurred</p>`;
    }
}
getPosts();