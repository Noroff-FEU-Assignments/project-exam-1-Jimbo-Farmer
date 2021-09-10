const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const searchText = params.get("search");
let urlExt = "&search="+searchText;

const results = document.querySelector(".posts");
const url = "https://frontendfarmer.com/ProjectExam/wp-json/wp/v2/posts?_embed&per_page=100";

const searchTerm = document.querySelector("#search-term");
searchTerm.innerHTML = `"${searchText}"`;

async function getPosts(){
    try { 
        const response = await fetch(url+urlExt);
        const output = await response.json();
        
        function generateHtml(){
            results.innerHTML = ``;
            
            for(let i = 0; i < output.length; i++){
                results.classList.remove("loading");
                results.innerHTML += `<div class=post-tile>
                <h2>${output[i].title.rendered}</h2>
                <img src="${output[i]._embedded['wp:featuredmedia']['0'].source_url}">
                ${output[i].excerpt.rendered}
                <a href="specificblog.html?id=${output[i].id}">Read More</a>
                </div>`
            }

        }
        generateHtml();  
        
          
        
    } catch (error) {
        console.log(error)
        results.classList.remove("loading");
        results.innerHTML =`<p>Apologies, an error has occurred</p>`;
    }
}
getPosts();