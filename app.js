/* creo gli oggetti */
/* Ho diversi oggetti dello stesso tipo(rappresentano nazioni) quindi userei una classe con un costruttore.*/

class Country {
    constructor(url, title, description) {
        this.url = url;
        this.title = title;
        this.description = description;
    }
}

/* creo l'array in cui inserire gli oggetti */
const slides = [
    /* creo gli oggetti passando i parametri corretti nel costruttore  */
    new Country("http://www.viaggiareonline.it/wp-content/uploads/2014/11/sweden_148857365.jpg", "Svezia", "Lorem SVEZIA, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam."),
    new Country("https://static1.evcdn.net/images/reduction/1513757_w-1920_h-1080_q-70_m-crop.jpg", "Perù", "Lorem PERU', dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam."),
    new Country("https://img.itinari.com/pages/images/original/0d3ed180-d22d-48e8-84df-19c4d888b41f-62-crop.jpg?ch=DPR&dpr=2.625&w=1600&s=7ebd4b5a9e045f41b4e0c7c75d298d6c", "Chile", "Lorem CHILE, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam."),
    new Country("https://static1.evcdn.net/images/reduction/1583177_w-1920_h-1080_q-70_m-crop.jpg", "Argentina", "Lorem ARGENTINA, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam."),
    new Country("https://cdn.sanity.io/images/24oxpx4s/prod/ed09eff0362396772ad50ec3bfb728d332eb1c30-3200x2125.jpg?w=1600&h=1063&fit=crop", "Colombia", "Lorem COLOMBIA, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam."),
];

/* recupero elementi dal DOM */
const next = document.getElementById("next");
const back = document.getElementById("back");
const mainImages = document.getElementById("main-images");
let selector = document.getElementById("selector");
const countryName = document.getElementById("country-name");
const countryDescription = document.getElementById("country-description");
const autoBtn = document.getElementById("auto-slide");
const autoDirection = document.getElementById("auto-direction");

/* Queste istruzioni settano le informazioni di partenza, prese dal primo oggetto, di title, description e url */
let index = 0; /*  indice */
mainImages.style.backgroundImage = `url(${slides[index].url})`;
countryName.innerText = `${slides[index].title}`;
countryDescription.innerText = `${slides[index].description}`;

/* BOTTONI AVANTI E INDIETRO--------------------------------------------
----------------------------------------------------------------------
----------------------------------------------------------------------
----------------------------------------------------------------------
----------------------------------------------------------------------
----------------------------------------------------------------------
----------------------------------------------------------------------
----------------------------------------------------------------------
----------------------------------------------------------------------
---------------------------------------------------------------------- */

/* scorrere avanti */
next.addEventListener("click", () => {
    /*--------------------------------------------- resetta se arrivi alla fine dell'array */
    index === slides.length - 1 ? (index = 0) : index++;

    mainImages.style.backgroundImage = `url(${slides[index].url})`;
    countryName.innerText = `${slides[index].title}`;
    countryDescription.innerText = `${slides[index].description}`;

    /* funzione che fa muovere il selettore */
    moveSelector(index);
});

/* scorrere indietro */
back.addEventListener("click", () => {
    /*--------------------------------------------- resetta se arrivi all'inizio fine dell'array */
    index === 0 ? (index = slides.length - 1) : index--;

    mainImages.style.backgroundImage = `url(${slides[index].url})`;
    countryName.innerText = `${slides[index].title}`;
    countryDescription.innerText = `${slides[index].description}`;

    /* funzione che fa muovere il selettore */
    moveSelector(index);
});

/* SCORRIMENTO AUTOMATICO --------------------------------------------
----------------------------------------------------------------------
----------------------------------------------------------------------
----------------------------------------------------------------------
----------------------------------------------------------------------
----------------------------------------------------------------------
----------------------------------------------------------------------
----------------------------------------------------------------------
----------------------------------------------------------------------
---------------------------------------------------------------------- */

/* ci sono due set interval, uno per andare avanti e uno per tornare indietro */

let slideNext;
let slideBack;
let autoIsClicked = 0;

/* con un click va avanti, con un altro click va indietro, con un terzo click si ferma*/
autoBtn.addEventListener("click", () => {
    if (autoIsClicked === 0) {
        /* tolgo i comandi per lo slide manuale visto che ora è automatico */
        next.style.visibility = "hidden";
        back.style.visibility = "hidden";

        autoBtn.innerHTML = `
        <h2 id="auto-direction">Indietro</h2>
        <i class="fa-solid fa-angles-left"></i>
        `;

        clearInterval(slideBack); /* stoppo il potenziale aperto clear interval */

        /* lancio il nuovo set interval */
        slideNext = setInterval(() => {
            index === slides.length - 1 ? (index = 0) : index++;
            mainImages.style.backgroundImage = `url(${slides[index].url})`;
            countryName.innerText = `${slides[index].title}`;
            countryDescription.innerText = `${slides[index].description}`;

            /* funzione che fa muovere il selettore */
            moveSelector(index);
        }, 400);

        /* dico che il bottone è stato cliccato*/
        autoIsClicked = 1;
    } else if (autoIsClicked === 1) {
        /* tolgo i comandi per lo slide manuale visto che ora è automatico */
        next.style.visibility = "hidden";
        back.style.visibility = "hidden";

        autoBtn.innerHTML = `
        <h2 id="auto-direction">stop</h2>
        <i class="fa-solid fa-stop"></i>
        `;

        clearInterval(slideNext); /* stoppo il potenziale aperto clear interval */

        /* lancio il nuovo set interval */
        slideBack = setInterval(() => {
            index === 0 ? (index = slides.length - 1) : index--;
            mainImages.style.backgroundImage = `url(${slides[index].url})`;
            countryName.innerText = `${slides[index].title}`;
            countryDescription.innerText = `${slides[index].description}`;

            /* funzione che fa muovere il selettore */
            moveSelector(index);
        }, 400);

        /* dico che il bottone è stato RI-cliccato*/
        autoIsClicked = 2;
    } else {
        clearInterval(slideBack); /* stoppo il potenziale aperto clear interval */
        clearInterval(slideNext); /* stoppo il potenziale aperto clear interval */

        /* rendo di nuovo visibili i controlli manuali */
        next.style.visibility = "visible";
        back.style.visibility = "visible";

        autoBtn.innerHTML = `
        
        <h2 id="auto-direction">Avanti</h2>
        <i class="fa-solid fa-angles-right"></i>
        `;

        autoBtn.classList.remove("red");

        autoIsClicked = 0; /* resetto il conto dei click */
    }
});

/* FUNZIONI-----------------------------------------------------------
----------------------------------------------------------------------
----------------------------------------------------------------------
----------------------------------------------------------------------
----------------------------------------------------------------------
----------------------------------------------------------------------
----------------------------------------------------------------------
----------------------------------------------------------------------
----------------------------------------------------------------------
---------------------------------------------------------------------- */

function moveSelector(index) {
    /*  questo if riguarda i thumbnails e muove il selettore nella posizione corretta*/
    if (index === 0) {
        selector.style.left = "0px";
    } else if (index === 1) {
        selector.style.left = "140px";
    } else if (index === 2) {
        selector.style.left = "280px";
    } else if (index === 3) {
        selector.style.left = "420px";
    } else if (index === 4) {
        selector.style.left = "560px";
    }
}
