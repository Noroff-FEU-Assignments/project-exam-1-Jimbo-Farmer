const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "https://frontendfarmer.com/ProjectExam/wp-json/wp/v2/posts/";
const urlExt = id;

const blogContainer = document.querySelector(".full-blog");

async function getBlogPost(){
    try { 
        const response = await fetch(url+urlExt);
        const output = await response.json();       
        
        function generateHtml(){
            blogContainer.classList.remove("loading");
            document.title = `Transform Tomorrow | ${output.title.rendered}`;
            blogContainer.innerHTML = `<div class="blog-post">
            <h1>${output.title.rendered}</h1>
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
        
    }
}
getBlogPost();



// modal js-------------

