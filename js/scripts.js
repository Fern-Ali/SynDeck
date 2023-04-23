/*!
* Start Bootstrap - Grayscale v7.0.6 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


//////////////

let cardAPI = "https://swapi.dev/api/people/1/";
let deckID = null;
async function getDeck() {
    let shuffleCards = axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    
    shuffleCards
        .then(data => {
            deckID = data.data.deck_id;
            console.log(data.data);
            
        })
        .catch(err => console.log(err));
}

let shuffleCards = axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
let drawCard = null;



/*ANSWER TO PART 1 AND 2 OF CARDS*/

shuffleCards
    .then(data => {
        deckID = data.data.deck_id;
        console.log(data.data);
        //drawCard = axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
        
        
        //return drawCard
    })
//    .then(data => {
//        drawCard = axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
//        let drawnCard = data.data.cards[0]
//        console.log(`you drew ${drawnCard.value} of ${drawnCard.suit} in deck ${deckID}. You have ${data.data.remaining} cards remaining in your deck.`)
//        console.log(data)
//        return drawCard
//    })
//    .then(data => {
//        let drawnCard = data.data.cards[0]
//        console.log(`you drew ${drawnCard.value} of ${drawnCard.suit} in deck ${deckID}. You have ${data.data.remaining} cards remaining in your deck.`)
//    })
//    .catch(err => console.log(err));




let cardFace = "";

$(".card-btn").on("click", draw);
function draw() {
        axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`).then(data => {
        let drawnCard = data.data.cards[0]
        console.log(drawnCard)
        console.log(`you drew ${drawnCard.value} of ${drawnCard.suit} in deck ${deckID}. You have ${data.data.remaining} cards remaining in your deck.`)
        cardFace = drawnCard.image;
        addCard();
    })
        .catch(err => console.log(err));
    
}

function addCard() {
    $("#addCardHere").append(`<div class="col-3 col-sm-1 "><img src=${cardFace}></div>`);
}

$(".hide-btn").click(function () {
    $("#addCardHere").toggle();
    if ($(".hide-btn").text() == 'Hide Cards') {
        $(".hide-btn").text("Show Cards");
    } else {
        $(".hide-btn").text("Hide Cards");
    }
});