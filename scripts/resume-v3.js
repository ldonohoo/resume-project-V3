// Lisa Donohoo
// March 2024
// Cloud Resume

// screen width definitions in px
const medium = '750';
const wide = '1000';
const veryWide = '1500';

/*
addEventListener("resize", (event) => {
    let documentWidth = document.documentElement.clientWidth;
    console.log(documentWidth);
    let currWidth = document.createTextNode(documentWidth);
    console.log(currWidth);
    document.getElementById('title-bar').appendChild.currWidth;
        // var theDiv = document.getElementById("<ID_OF_THE_DIV>");
        //  var content = document.createTextNode("<YOUR_CONTENT>");
       // theDiv.appendChild(content);
}); */

// Event Listeners for buttons
document.getElementById("project-button").addEventListener("click", expandProjectMenu);
document.querySelector("#pie-shape").addEventListener("click", pieSelected);

// if project button selected, choose between slide out (narrow screens) 
//      or spin out (wider screens)
function expandProjectMenu() {
    let currWidth = document.documentElement.clientWidth;
    // if current width is less than medium, assume narrow/mobile widths
    if (currWidth < medium) {
        slideOutMenu();
    } else if (currWidth >= medium) {
        spinOutMenu();
    }
}

// Create a circular, expanding, spin-out menu with clickable menu option 
//      buttons on it toggle it on and off with a click
function spinOutMenu() {
    // Get DOM elements for element to spin out
    let spinOut = document.getElementById("project-container");
    // Check classes on element to see if already spun out or in 
    let alreadyOut = spinOut.classList.contains("spin-out-style"); 
    let alreadyIn = spinOut.classList.contains("spin-in-style"); 
    if (!alreadyIn && !alreadyOut) {
        // this gets activated the first time, initial spin-out of menu
        spinOut.classList.toggle("spin-out-style");
    } else {
        // If NOT initial spin-out of menu, need to remove and re-add element so
        // we can re-run animation on that element
        //    - clone node, remove node, re-append node to parent
        //      (cloneNode = true, clones node and any children)
        let spinOutCopy = spinOut.cloneNode(true);
        spinOut.remove();
        let spinOutParent = document.getElementById("projects-section");
        spinOutParent.appendChild(spinOutCopy);
        // reset spinOut as if you don't it will point to old, removed node
        //      (still exists in memory but removed from DOM!)
        spinOut = document.getElementById("project-container");
        // Then go ahead and toggle both classes to activate animations
        spinOut.classList.toggle("spin-in-style");
        spinOut.classList.toggle("spin-out-style");
    }
}

function slideOutMenu() {

    // functions for sliding out project buttons
    //      positions are initial y-axis positions of 
    function slideInnerLayer(topInitPos, bottomInitPos, buttonHeight, delay) {
        setTimeout(() => { 
            // move button positions to initial position MINUS button height (UP)
            let topPos = topInitPos - buttonHeight;
            menuItem1.style.top = `${topPos}rem`;
            menuItem2.style.top = `${topPos}rem`;
            menuItem3.style.top = `${topPos}rem`; // this one is visible 
            // move button Positions to initial position PLUS button height (DOWN)
            let bottomPos = bottomInitPos + buttonHeight;
            menuItem4.style.top = `${bottomPos}rem`;  // this one is visible 
            menuItem5.style.top = `${bottomPos}rem`;
            menuItem6.style.top = `${bottomPos}rem`;
        }, delay);
    }  // end slideInnerLayer
    function slideMiddleLayer(topInitPos, bottomInitPos, buttonHeight, delay) {
    setTimeout(() => { 
        //slide in/out second layer
        // move button positions to initial position MINUS 2 x button height (UP)
        let topPos = topInitPos - (buttonHeight * 2);
        menuItem1.style.top = `${topPos}rem`;
        menuItem2.style.top = `${topPos}rem`; // this one is visible   
        // move button Positions to initial position PLUS 2 xbutton height (DOWN)
        let bottomPos = bottomInitPos + (buttonHeight * 2);
        menuItem5.style.top = `${bottomPos}rem`;
        menuItem6.style.top = `${bottomPos}rem`; // this one is visible 
    }, delay);
    } // end slideMiddleLayer
    function slideOuterLayer(topInitPos, bottomInitPos, buttonHeight, delay) {
    setTimeout(() => { 
        // move button positions to initial position MINUS 3 x button height (UP)
        let topPos = topInitPos - (buttonHeight * 3);
        menuItem1.style.top = `${topPos}rem`; // this one is visible 
        // move button Positions to initial position PLUS 3 x button height (DOWN)
        let bottomPos = bottomInitPos + (buttonHeight * 3);
        menuItem6.style.top = `${bottomPos}rem`; // this one is visible 
    }, delay);
    } // end slideOuterLayer

    // MAIN LOGIC for slideOutMenu:
    // get elements for each project slider button
    menuItem1 = document.querySelector('.slide-1');
    menuItem2 = document.querySelector('.slide-2');
    menuItem3 = document.querySelector('.slide-3');
    menuItem4 = document.querySelector('.slide-4'); 
    menuItem5 = document.querySelector('.slide-5');
    menuItem6 = document.querySelector('.slide-6');
    // check if slide in or slide out by looking at class on project container

    let slideOut = true;
    // logic here!!!!!!!!!!!!!!!!

    // set initial start positions and how far to slide (buttonHeight)
    let topInitPos, bottomInitPos;
    let buttonHeight = 4;
    // sliding out (opening project buttons)
    if (slideOut) {
        // set initial positions for top & bottom slider buttons
        topInitPos = -5;
        bottomInitPos = -4;
        // slide out buttons in order: inner, then middle, then outer
        slideInnerLayer(topInitPos, bottomInitPos, buttonHeight, 1);
        slideMiddleLayer(topInitPos, bottomInitPos, buttonHeight, 100);
        slideOuterLayer(topInitPos, bottomInitPos, buttonHeight, 200)
    // sliding in (closing project buttons)
    } else {
        // set initial positions for top & bottom slider buttons
        initialPosTopSliders = -17;
        initialPosBottomsliders = 8;
        // slide in buttons in order: first outer, then middle, then inner
        slideOuterLayer(topInitPos, bottomInitPos, buttonHeight, 200)
        slideMiddleLayer(topInitPos, bottomInitPos, buttonHeight, 100);
        slideInnerLayer(topInitPos, bottomInitPos, buttonHeight, 1);
    }
} // end slideOutMenu

function pieSelected(event) {
    // pull the wedge number from the class of the target clicked on
    let wedgeNumber = event.target.getAttribute("class");
    console.log(`clicking on project ${wedgeNumber}!`);
}




// my attempt at dynamically assigning buttons to animate from DOM structure...
    // let slideButtons = document.querySelectorAll(".slide-button");
    // slideButtons.forEach( (element) => {
    //     buttonName = element.classList[1];
    //     buttonName = buttonName.replace(/\-/, '');
    //     classButtonName = '.' + buttonName;
    //     eval('let ' + buttonName + '=' + document.querySelector(classButtonName));
 
    // });
    // console.log(slide1);
    // console.log(slide2);
    // console.log(slide5);
    // console.log(slide6);