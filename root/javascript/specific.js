const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "https://frontendfarmer.com/ProjectExam/wp-json/wp/v2/posts/";
const urlExt = id;

const blogContainer = document.querySelector(".full-blog");
const meta = document.querySelector("#meta-description");


async function getBlogPost(){
    try { 
        const response = await fetch(url+urlExt+"?_embed");
        const output = await response.json(); 
               
        function generateHtml(){
            blogContainer.classList.remove("loading");
            document.title = `Transform Tomorrow | ${output.title.rendered}`;
            blogContainer.innerHTML = `<div class="blog-post">
            <h1>${output.title.rendered}</h1>
            <img class="featured" src="${output._embedded['wp:featuredmedia']['0'].source_url}" alt="${output._embedded['wp:featuredmedia']['0'].alt_text}">
            ${output.content.rendered}
            <div class="modal-box"></div>
            </div>`;
            meta.content = output.excerpt.rendered.replace(/(<([^>]+)>)/gi, "");  //Thanks https://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/      
            console.log(output._embedded['wp:featuredmedia']['0'])
        }
        generateHtml();  
        let images =[];
        images.push(document.querySelectorAll(".wp-block-image"));
        images.push(document.querySelector(".featured")); 
        console.log(images)
        const modalBox = document.querySelector(".modal-box");
        for(let i = 0; i < images.length; i++){
        images[i].onclick = function(){
            modalBox.innerHTML += `<img src="${this.src}" alt="${this.alt}">`;
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

