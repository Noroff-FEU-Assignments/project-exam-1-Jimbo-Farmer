const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "https://frontendfarmer.com/ProjectExam/wp-json/wp/v2/posts/";
const urlExt = id;

const blogContainer = document.querySelector(".full-blog");

async function getBlogPost(){
    try { 
        const response = await fetch(url+urlExt+"?_embed");
        const output = await response.json(); 
               
        function generateHtml(){
            blogContainer.classList.remove("loading");
            document.title = `Transform Tomorrow | ${output.title.rendered}`;
            blogContainer.innerHTML = `<div class="blog-post">
            <h1>${output.title.rendered}</h1>
            <img class="featured" src="${output._embedded['wp:featuredmedia']['0'].source_url}">
            ${output.content.rendered}
            <div class="modal-box"></div>
            </div>`;            
        }
        generateHtml();  
        
        const images = document.querySelectorAll(".wp-block-image");
        const modalBox = document.querySelector(".modal-box");
        for(let i = 0; i < images.length; i++){
        images[i].onclick = function(){
            modalBox.innerHTML += this.innerHTML;
            modalBox.classList.add("open");
             
            } 
            window.onclick = function(event){
                if(event.target === modalBox){
                    event.target.classList.remove("open");
                    modalBox.innerHTML = ``;
                }
            }  
            window.ontouchend = function(event){
                if(event.target === modalBox){
                    event.target.classList.remove("open");
                    modalBox.innerHTML = ``;
                }
            }       
        }

        
                
        
    } catch (error) {
        console.log(error)
        blogContainer.classList.remove("loading");
        blogContainer.innerHTML =`<p>Apologies, an error has occurred</p>`;
    }
}
getBlogPost();



// modal js-------------

