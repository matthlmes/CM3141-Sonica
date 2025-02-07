const sprite = document.getElementById('sprite');

//Get areas for redirection (Change URL for each area)
const redirectAreas = [
    { element: document.getElementById('area1'), url: 'page2.html' },
    { element: document.getElementById('area2'), url: 'page2.html' },
    { element: document.getElementById('area3'), url: 'page2.html' }
];

//Gets redirect-area class and assigns to variable
const RedirectClass = document.querySelector('redirect-area');


// Set the initial position to the center of the screen     //avoids jump to click on initial page refresh
window.addEventListener('load', () => {
    const initialX = window.innerWidth / 2 - sprite.offsetWidth / 2;
    const initialY = window.innerHeight / 2 - sprite.offsetHeight / 2;
    sprite.style.left = `${initialX}px`;
    sprite.style.top = `${initialY}px`;
});

// Update the sprite's position on click
document.addEventListener('click', (event) => {
    const x = event.clientX - sprite.offsetWidth / 2;
    const y = event.clientY - sprite.offsetHeight / 2;
    sprite.style.left = `${x}px`;
    sprite.style.top = `${y}px`;
    
    // Calls redirect check after delay (Match css time)
    setTimeout(() => {
        checkRedirect();
    }, 750);
});

//On mouse over of class get specific ID, use ID to enlarge on mouse over
RedirectClass.addEventListener('mouseover', (mouseover) => {
        idName = document.getElementById(this);
        console.log(idName);

});


//  Checks if sprite is over an area and redirects to relevant page
function checkRedirect() {
    const spriteRect = sprite.getBoundingClientRect();  //Gets sprite location

    for (const area of redirectAreas) {
        const areaRect = area.element.getBoundingClientRect();  //Gets Area locations of all areas in array

        if (
            spriteRect.left < areaRect.right &&
            spriteRect.right > areaRect.left &&
            spriteRect.top < areaRect.bottom &&
            spriteRect.bottom > areaRect.top
        ) {
            window.location.href = area.url;
            break;
        }
    }
}
