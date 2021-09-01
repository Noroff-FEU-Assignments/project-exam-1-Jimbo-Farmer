const latestPosts = document.querySelector(".latest-posts")
const url = "http://frontendfarmer.com/ProjectExam/wp-json/wp/v2/posts?_embed"

async function getPosts(){
    try { 
        const response = await fetch(url);
        const output = await response.json();
        for(let i = 0; i < output.length; i++){
            latestPosts.innerHTML += `<div class=post-tile>
            <h2>${output[i].title.rendered}</h2>
            <img src="${output[i]._embedded['wp:featuredmedia']['0'].source_url}">
            <p>${output[i].excerpt.rendered}</p>

            </div>`
        }
        
        console.log(output[0]._embedded['wp:featuredmedia']['0'].source_url)
    } catch (error) {
        
    }
}
getPosts();