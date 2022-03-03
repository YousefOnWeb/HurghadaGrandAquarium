
// preparing data needed to make every single nav item:
const textForEachNavItem = [];
const destinationIDForEachNavItem = []; // to be used as the value of 'href' in HTML code

document.querySelectorAll(".section-title").forEach(

    function(sectionTitleElement, indexOfThatElement){
        textForEachNavItem[indexOfThatElement] = sectionTitleElement.textContent;
        destinationIDForEachNavItem[indexOfThatElement] = sectionTitleElement.id;
    }

);


// creating each nav item and adding it inside the nav items list in html:
// hiding nav bar first to prevent browser excessive re-rendering:
const navListHTMLElement = document.querySelector(".nav-bar-links");
navListHTMLElement.style.display = "none";

const floatClearerDiv = document.querySelector(".float-clearer");

for(let i = 0 ; i<textForEachNavItem.length; i++){
    let navItemOuter_LI_Tag = document.createElement("li");
    navItemOuter_LI_Tag.classList.add("nav-bar-link");

    let navItemInner_A_Tag = document.createElement("a");
    navItemInner_A_Tag.setAttribute("href", "#"+destinationIDForEachNavItem[i]);
    navItemInner_A_Tag.textContent = textForEachNavItem[i];

    navItemOuter_LI_Tag.appendChild(navItemInner_A_Tag);

    navListHTMLElement.insertBefore(navItemOuter_LI_Tag, floatClearerDiv);
}

// making nav bar appear back again after appending
navListHTMLElement.style.display = "block";


const navbarLinksElements = document.querySelectorAll(".nav-bar-link a");
navbarLinksElements.forEach(

    function(linkElement, indexOfThatElement){
        linkElement.addEventListener('click', function(){
            navbarLinksElements.forEach(
                function(el){
                    el.classList.remove("active");
                }
            )
            linkElement.classList.add('active');
        })
    }

)


//--------------------------------------------------------


// navbar thinner on scrolldown
let resizeNavbarAccordingToViewLocation = function(){
    if(document.documentElement.scrollTop > 40 || document.body.scrollTop > 40){
        document.querySelector(".nav-bar-main-link a").classList.add("thinner-logo");
        document.querySelector(".navbar-tile").classList.add("thinner-navbar-tile");
    }
    else{
        document.querySelector(".nav-bar-main-link a").classList.remove("thinner-logo");
        document.querySelector(".navbar-tile").classList.remove("thinner-navbar-tile");
    }
}

// following part responsible for highlighting navbar item when section is in viewport
function isInsideView(element) {
    let rect = element.getBoundingClientRect();

    return (
        rect.top > -window.innerHeight*0.4 &&
        rect.top < window.innerHeight*0.65
    );
}


window.onscroll = function(){
    resizeNavbarAccordingToViewLocation();

    document.querySelectorAll(".tile").forEach(
        function(tileElement, tileIndex){
            if(isInsideView(tileElement)){
                //tileElement.style.backgroundColor = "red";
                tileElement.classList.add("active-section");
            }
            else{
                tileElement.classList.remove("active-section");
                //tileElement.style.backgroundColor = "white";
            }
        }
    )
}



// scroll smoothly to section when clicked in navbar

const navbarLinks = document.querySelectorAll(".nav-bar-link a");

navbarLinks.forEach(
    function(navbarLinkElement, navbarLinkElementIndex){
        navbarLinkElement.addEventListener("click", function(event){
                event.preventDefault();
                document.querySelector("#"+navbarLinkElement.href.split("#")[1]).scrollIntoView({behavior: "smooth"});
            }
        )
    }
)

// scroll smoothly to first section when clicking 'see below' button

document.querySelector(".see-below-button").onclick = function(){
    // scroll to first section title
    document.querySelector(".section-title").scrollIntoView({behavior: "smooth"});
}