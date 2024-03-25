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

function pieSelected(event) {
    // pull the wedge number from the class of the target clicked on
    let wedgeNumber = event.target.getAttribute("class");
    console.log(`clicking on project ${wedgeNumber}!`);
}


function slideOutMenu() {
    // create slide out buttons:
    //      initial positions on y-axis for use in top: styling
    //      slideAmt is how far to slide
    //      initial positions are for when slider is currently IN or OUT
    //      movedirection determines direction to slide button
    const slideButtons = { 
        initTopPos: -5,  // top slide up buttons, initial position on y-axis
        initBotPos: -4,  // bottom slide down buttons, initial position on y-axis
        slideAmt: 4, 
        buttons: [
            {
            num: 1, 
            element: document.querySelector('.slide-1'),
            outProperties: {
                moveDirection: -1  //negative one is up, positive one is down
                },
            inProperties: {
                moveDirection: +1
                }
            },
            {
            num: 2, 
            element: document.querySelector('.slide-2'),
            outProperties: {
                moveDirection: -1  //negative one is up, positive one is down
                },
            inProperties: {
                moveDirection: +1
                }
            }, 
            {num: 3, 
                element: document.querySelector('.slide-3'),
                outProperties: {
                    moveDirection: -1  //negative one is up, positive one is down
                    },
                inProperties: {
                    moveDirection: +1
                    }
            }, 
            {num: 4, 
                element: document.querySelector('.slide-4'),
                outProperties: {
                    moveDirection: +1  //negative one is up, positive one is down
                    },
                inProperties: {
                    moveDirection: -1
                    }
            }, 
            {num: 5, 
                element: document.querySelector('.slide-5'),
                outProperties: {
                    moveDirection: +1  //negative one is up, positive one is down
                    },
                inProperties: {
                    moveDirection: -1
                    }
            }, 
            {num: 6, 
                element: document.querySelector('.slide-6'),
                outProperties: {
                    moveDirection: +1  //negative one is up, positive one is down
                    },
                inProperties: {
                    moveDirection: -1
                    }
            }, 
        ]
    }; // end slideButtons object
    // used to retrieve correct button data
    function slideButton(buttonNumber, topButton, slideOut, level) {
        // uses either slide in or slide out properties on button
        let prop, initPos;
        if (slideOut) {
            prop = 'outProperties';
        } else {
            prop = 'inProperties';
        }
        if (topButton) {
            initPos = slideButtons.initTopPos;
        } else {
            initPos = slideButtons.initBotPos;
        }
        // gets current button object from button number
        let currButton = 
            slideButtons.buttons.find(element => element.num === buttonNumber);
        let newTopPos = initPos +
            currButton[prop].moveDirection * slideButtons.slideAmt * level;
        // moves the button to new position
        currButton.element.style.top = `${newTopPos}rem`;
    }
    function slideButtonsInOrder(slideOut) {
        // check for odd number of buttons
        let oddNumberButtons = false;
        if (slideButtons.buttons.length % 2 !== 0) {
            oddNumberButtons = true;
         } 
        // divide number of buttons by 2 to get button groups
        buttonGroupTop = Math.floor(slideButtons.buttons.length / 2);
        buttonGroupBottom = buttonGroupTop;
        // if uneven number of buttons put extra button on bottom
        if (oddNumberButtons) {
           buttonGroupBottom++;
        } 
        let buttonsToSlide, bottomNum, aTopButton;
        if (slideOut) {
            // go through each layer of buttons 
            //   (use bottom group as it can have one more button)
            for (let slideLayer=1; slideLayer<=buttonGroupBottom; slideLayer++) {
                // slide one less button each layer
                bottomNum = slideButtons.buttons.length;
                buttonsToSlide = buttonGroupBottom - slideLayer + 1;
                // for each layer, slide out buttons
                for (let topNum=1; topNum<=buttonsToSlide; topNum++) {
                    // set slide level
                    level = slideLayer;
                    // get bottom button
                    // slide up buttons in layer
                    if (oddNumberButtons && topNum === 1) {
                        // <skip sliding out top button if odd # of buttons>
                        // slide out bottom button
                        aTopButton = false;
                        slideButton(buttonNum, aTopButton, slideOut, level);
                    } else {
                    // slide out top button
                    aTopButton = true;
                    slideButton(topNum, aTopButton, slideOut, level);
                    // slide out bottom button
                    aTopButton = false;
                    slideButton(bottomNum, aTopButton, slideOut, level);
                    }
                    bottomNum--;
                } // end go through buttons for each layer
            } // end go through layers of buttons to slide
        } else {  // else if sliding OUT
            // go through each layer of buttons 
            //   (use bottom group as it can have one more button)
            for (let slideLayer=buttonGroupBottom; slideLayer>=1; slideLayer--){
                // slide one less button each layer
                bottomNum = slideButtons.buttons.length;
                buttonsToSlide = slideLayer;
                // for each layer, slide in buttons
                for (topNum=1; topNum<=buttonsToSlide; topNum++) {
                    // set slide level
                    level = buttonsToSlide - slideLayer + 1;
                     // slide up buttons in layer
                     if (oddNumberButtons && topNum === 1) {
                        // <skip sliding out in button if odd # of buttons>
                        // slide in bottom button
                        slideButton(buttonNum, false, slideOut, level);
                    } else {
                    // slide in top button
                    slideButton(topNum, true, slideOut, level);
                    // slide in bottom button
                    slideButton(bottomNum, false, slideOut, level);
                    }
                    bottomNum--;
                } // end go through buttons for each layer
            } // end go through layers of buttons to slide
        } // end if (slideOut) 
    }  // end slideButtonsInOrder function  
    
    // --------slideOutMenu main logic-------------
    let projectElement = document.getElementById("project-container");
    let slideOut = projectElement.classList.contains("slide-out-retracted");
    slideButtonsInOrder(slideOut);
    // flip the slide-out-retracted class 
    projectElement.classList.toggle("slide-out-retracted");
} // end function slideOutMenu








    // if (slideOut) {
        
    //     // slide out first level
    //     // (button number, true if Out, level)
    //     slideButton(1, slideOut, 1);  // slide buttons 1-3, 1 position UP
    //     slideButton(2, slideOut, 1); 
    //     slideButton(3, slideOut, 1);  
    //     slideButton(6, slideOut, 1);  // slide buttons 4-6, 1 position DOWN
    //     slideButton(5, slideOut, 1);
    //     slideButton(4, slideOut, 1);
    //     // slide out second level
    //     slideButton(1, slideOut, 1);  // slide buttons 1 & 2, 1 position UP
    //     slideButton(2, slideOut, 1); 
    //     slideButton(6, slideOut, 1);  // slide buttons 5 & 6, 1 position DOWN
    //     slideButton(5, slideOut, 1);
    //     // slide out third level
    //     slideButton(1, slideOut, 1);  // slide button 1, 1 position UP
    //     slideButton(6, slideOut, 1);  // slide button 6, 1 position DOWN
    // } else {
    //     slideButton(1, slideOut, 1);  // slide button 1, 1 position UP
    //     slideButton(6, slideOut, 1);  // slide button 6, 1 position DOWN
    //     slideButton(1, slideOut, 1);  // slide buttons 1 & 2, 1 position UP
    //     slideButton(2, slideOut, 1); 
    //     slideButton(6, slideOut, 1);  // slide buttons 5 & 6, 1 position DOWN
    //     slideButton(5, slideOut, 1);
    //     slideButton(1, slideOut, 1);  // slide buttons 1-3, 1 position UP
    //     slideButton(2, slideOut, 1); 
    //     slideButton(3, slideOut, 1);  
    //     slideButton(6, slideOut, 1);  // slide buttons 4-6, 1 position DOWN
    //     slideButton(5, slideOut, 1);
    //     slideButton(4, slideOut, 1);
    // }






/*
function slideOutMenu() {

    // functions for sliding out project buttons
    //      positions are initial y-axis positions of 
    function slideInnerLayer(topInitPos, bottomInitPos, buttonHeight, delay) {
        // setTimeout(() => { 
            // move button positions to initial position MINUS button height (UP)
            let topPos = topInitPos - buttonHeight;
             //negative one is up, positive one is down
            menuItem2.style.top = `${topPos}rem`;
            menuItem3.style.top = `${topPos}rem`; // this one is visible 
            // move button Positions to initial position PLUS button height (DOWN)
            let bottomPos = bottomInitPos + buttonHeight;
            menuItem4.style.top = `${bottomPos}rem`;  // this one is visible 
            menuItem5.style.top = `${bottomPos}rem`;
            menuItem6.style.top = `${bottomPos}rem`;
        // }, delay);
    }  // end slideInnerLayer
    function slideMiddleLayer(topInitPos, bottomInitPos, buttonHeight, delay) {
    // setTimeout(() => { 
        //slide in/out second layer
        // move button positions to initial position MINUS 2 x button height (UP)
        let topPos = topInitPos - (buttonHeight * 2);
        menuItem1.style.top = `${topPos}rem`;
        menuItem2.style.top = `${topPos}rem`; // this one is visible   
        // move button Positions to initial position PLUS 2 xbutton height (DOWN)
        let bottomPos = bottomInitPos + (buttonHeight * 2);
        menuItem5.style.top = `${bottomPos}rem`;
        menuItem6.style.top = `${bottomPos}rem`; // this one is visible 
    // }, delay);
    } // end slideMiddleLayer
    function slideOuterLayer(topInitPos, bottomInitPos, buttonHeight, delay) {
    // setTimeout(() => { 
        // move button positions to initial position MINUS 3 x button height (UP)
        let topPos = topInitPos - (buttonHeight * 3);
        menuItem1.style.top = `${topPos}rem`; // this one is visible 
        // move button Positions to initial position PLUS 3 x button height (DOWN)
        let bottomPos = bottomInitPos + (buttonHeight * 3);
        menuItem6.style.top = `${bottomPos}rem`; // this one is visible 
    // }, delay);
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
*/




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

