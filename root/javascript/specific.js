const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "https://frontendfarmer.com/ProjectExam/wp-json/wp/v2/posts/";
const urlExt = id;

const blogContainer = document.querySelector(".full-blog");
const meta = document.querySelector("#meta-description");
const loadingIndicator = document.querySelector(".loading");

async function getBlogPost(){
    try { 
        const response = await fetch(url+urlExt+"?_embed");
        const output = await response.json(); 
               
        function generateHtml(){
            loadingIndicator.classList.remove("loading");
            document.title = `Transform Tomorrow | ${output.title.rendered}`;
            blogContainer.innerHTML = `<div class="blog-post">
            <h1>${output.title.rendered}</h1>
            <img tabindex="0" class="featured" src="${output._embedded['wp:featuredmedia']['0'].source_url}" alt="${output._embedded['wp:featuredmedia']['0'].alt_text}">
            ${output.content.rendered}
            <div class="modal-box"></div>
            </div>`;
            meta.content = output.excerpt.rendered.replace(/(<([^>]+)>)/gi, "");  //Thanks https://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/      
            
        }
        generateHtml();  

        let images =[];
        if(document.querySelector(".wp-block-image")){                          //Check for images in the article before attempting to add them.
            images.push(document.querySelectorAll(".wp-block-image img")[0]);
            const contentImages = document.querySelectorAll(".wp-block-image img");
            for(let i = 0; i < contentImages.length; i++){
                contentImages[i].tabIndex = "0";                                //So that keyboard users can access the modal. 
            }
        }
        
        images.push(document.querySelector(".featured")); 

        const modalBox = document.querySelector(".modal-box");
        for(let i = 0; i < images.length; i++){
            images[i].onclick = modal;
            images[i].onkeydown = function(){
                if((event.key === "Enter")&& (modalBox.innerHTML === "")){
                    modal();
                }
            }
        }

        function closeModal(){
            modalBox.classList.remove("open");
            modalBox.innerHTML = ``;
        }

        function modal(){
            console.log(this)
            console.log(event.target)
            modalBox.innerHTML += `<img src="${event.target.src}" alt="${event.target.alt}">`;
            modalBox.classList.add("open"); 
             
            window.onclick = function(event){
                if(event.target === modalBox){
                    closeModal();
                }
            }  
            window.ontouchend = function(event){
                if(event.target === modalBox){
                    closeModal();
                }
            } 
            document.addEventListener("keydown", function(){
                if(event.key ==="Escape"){
                    closeModal();
                }
            })
        }
        
                
        
    } catch (error) {
        console.log(error)
        loadingIndicator.classList.remove("loading");
        blogContainer.innerHTML =`<p>Apologies, an error has occurred</p>`;  
    }
}
getBlogPost();



// modal js-------------

