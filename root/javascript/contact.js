const button = document.querySelector("button");
const form = document.querySelector("#contact-form");
const inputs = document.querySelectorAll("input");
const notification = document.querySelector(".message");

const nameInput = document.querySelector("#name");
const nameError = document.querySelector("#name-error");

const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subject-error");

const email = document.querySelector("#email");
const emailError = document.querySelector("#email-error");

const message = document.querySelector("#message");
const messageError = document.querySelector("#message-error");

form.reset();
button.disabled = true;

function checkFormComplete(){
    if((lengthCheck(nameInput.value.trim().length, 5)) && (emailCheck(email.value))&&(lengthCheck(subject.value.trim().length, 15))&&(lengthCheck(message.value.trim().length, 25))){
        button.disabled = false;
        messageError.style.visibility = "hidden";
        nameError.style.visibility = "hidden";
        emailError.style.visibility = "hidden";
        subjectError.style.visibility = "hidden";
    } else {
        button.disabled = true;
    }
}
nameInput.onblur = function(){
    if(lengthCheck(nameInput.value.trim().length, 5)){
        nameError.style.visibility = "hidden";
    } else {
        nameError.style.visibility = "unset";
    }
    checkFormComplete();
}
email.onblur = function(){
    if(emailCheck(email.value)){
        emailError.style.visibility = "hidden";
    } else {
        emailError.style.visibility = "unset";
    }
    checkFormComplete();
}
subject.onblur = function(){
    if(lengthCheck(subject.value.trim().length, 15)){
        subjectError.style.visibility = "hidden";
    } else {
        subjectError.style.visibility = "unset";
    }
    checkFormComplete();
}
message.onblur = function(){
    if(lengthCheck(message.value.trim().length, 25)){
        messageError.style.visibility = "hidden";
    } else {
        messageError.style.visibility = "unset";
    }
    checkFormComplete();
}
message.onkeyup = checkFormComplete;
nameInput.onkeyup = checkFormComplete;
email.onkeyup = checkFormComplete;
subject.onkeyup = checkFormComplete;

function lengthCheck(input, desiredLength){
    if(input >= desiredLength){
        return true;
    } else {
        return false;
    }
}

function emailCheck(emailInput){
    const regEx = /\S+@+\S+\.\S+/;
    const isValid = regEx.test(emailInput);
    return isValid;
}

const loadingIndicator = document.querySelector(".loading-indicator");

form.onsubmit = async function(event){
    button.innerHTML = "Sending...";
    loadingIndicator.classList.add("loading");
    event.preventDefault();
    const response = await fetch(event.target.action, {
        method: event.target.method,
        body: new FormData(form),
    })
    loadingIndicator.classList.remove("loading");
    if(response.ok){
        location.href = "contact.html#success";
    } else {
        document.querySelector(".error-message").innerHTML = `
        <h2>Apologies, an error has occurred</h2>`
    }
}



