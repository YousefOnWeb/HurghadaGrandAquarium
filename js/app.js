
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
    var rect = element.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}


window.onscroll = function(){
    resizeNavbarAccordingToViewLocation();

    for(let i = 0 ; i<textForEachNavItem.length+1 ; i++){
        let elementToBeChecked = document.querySelectorAll(".section-start")[i];
        if(isInsideView(elementToBeChecked)){
            document.querySelectorAll(".nav-bar-link a")[i].classList.add("active");
        }
        else{
            document.querySelectorAll(".nav-bar-link a")[i].classList.remove("active");
        }
    }

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