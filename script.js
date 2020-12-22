const unwantedWordsRegex = /covid|korona|vakcí|vaccin|corona|pandem|pandém|očkov|PES|lockdown|nakaž|p[rř]ízn/gi


let allNodes
let currentElement
let text
let i
let url 

function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}    

// getURL
function getURL(){
    url =  window.location.toString()
}

//removing some dashboards from sites i use
// AKTUALNE, PRAZSKY DENNIK, SME
function removePanels(){
    if (url.match(/aktualne.cz/g)){     document.querySelector("#special-widget-6913b46063a111ea80e60cc47ab5f122").remove()}
    else if (url.match(/sme.sk/g)){          document.querySelector(".corona-widget").remove()}
    else if (url.match(/prazsky.denik.cz/g)){document.querySelector(".covid-banner").remove()}
    else if (url.match(/seznamzpravy.cz/g)){ document.querySelector("#szn-clanky > div > div > div:nth-child(2) > div > header > div.c_d > div.d_iq._5f0d802c27da4d1cb55fb040 > div.f_ip._5f5a183107c5c81028a33c12 > div > iframe").remove()}
}

function removeContent(){
    // all elements with keywords
    allNodes = document.querySelectorAll("h1, h2, h3, h4, h5, a, p, li");
    for (i = 0; i < allNodes.length; i++) {
        text = allNodes[i].textContent
        if (text.match(unwantedWordsRegex)){
            currentElement = allNodes[i]
            currentElement.remove()
        }
    }
}

//Execute with every new page, novinky is special i dont know why
docReady(function() {
    getURL();
    if (url.match(/novinky.cz/g))
    setTimeout(function(){ 
        removePanels();
        removeContent(); }, 300);
    else{
    removePanels();
    removeContent();}
}); 
//Scrolling and appearing content
window.setInterval(removeContent, 1000)

/* version that waits for fullload
window.onload = function runExtension(){
    removePage();
    removePanels();
    removeContent();
} */

  