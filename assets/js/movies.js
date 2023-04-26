import search from "./search.js";
import apiKey from "./apiKey.js";
// rechercher ----------
console.log(search);
const searchBar = document.querySelector("#searchBar");
const button = document.querySelector("#button");
const myContainer = document.querySelector("#myContainer");
const srcImg = "https://image.tmdb.org/t/p/w300";
const notFindImg = "./assets/images/not-find.jpg";
//fonction du header
search("/search/movie");
let mediaType;
let status;
const getMedia = (mediaType, status, nbOfpage, myTitle) => {
    // creation
    const title = document.createElement("h2");
    // personnalisation
    title.classList.add("my-5", "align-self-start", "container");
    title.textContent = myTitle;
    const myDiv2 = document.createElement("div");
    myDiv2.classList.add("d-flex", "w-100", "overflow-auto", "scroller", "gap-2");
    const cardShowMore = document.createElement("div");
    // on créé une carte qui sera ajouté à la fin des autres pour créer un interaction supplémentaire
    cardShowMore.classList.add("card", "justify-content-enter", "align-items-center", "bg-black");
    cardShowMore.style.cursor = "pointer";
    cardShowMore.style.minWidth = "200px";
    cardShowMore.innerHTML += '<div><img class="img-fluid" src="./assets/images/show-more.jpg"></div>';
    // recupérer plus de contenu (1 page par défaut)
    for (let i = 1; i <= nbOfpage; i++) {
        fetch(`https://api.themoviedb.org/3/${mediaType}/${status}?api_key=${apiKey}&language=fr-FR&page=${i}`)
            .then((response) => response.json())
            .then((data) => {
            for (const key in data.results) {
                if (data.results[key].vote_count >= 10) {
                    // création d'une carte pour chaque contenu
                    const myCard = document.createElement("div");
                    myCard.classList.add("card", "justify-content-between", "bg-black");
                    myCard.style.minWidth = "200px";
                    myCard.style.cursor = "pointer";
                    myCard.id = data.results[key].id;
                    myCard.innerHTML += `
                    
                    
                    
                    ${!data.results[key].poster_path
                        ? !data.results[key].profile_path
                            ? `<div><img class="img-fluid card-img-top" src=${notFindImg} alt="not found image"></div>`
                            : `<div><img class="img-fluid card-img-top" src=${srcImg + data.results[key].profile_path} alt="not found image"></div>`
                        : `<div><img class="img-fluid card-img-top" src=${srcImg + data.results[key].poster_path} alt="not found image"></div>`}
                    
                    
                    
                    ${data.results[key].overview &&
                        data.results[key].media_type === "movie"
                        ? '<div class="card-footer bg-light"><span class="fw-bold fs-6 text-end text-black">Popularité : ' +
                            data.results[key].popularity.toFixed(0) +
                            "</span></div>"
                        : '<div class="card-footer bg-light"><span class="fw-bold fs-6 text-end text-black"> Score : <span>' +
                            data.results[key].vote_average.toFixed(1) +
                            "</span></span></div>"}
                
                `;
                    // on ajoute la carte dans la div parente
                    myDiv2.append(myCard);
                }
            }
            // appel
            //  une fois remplie on appel enfin notre carte d'interaction
            cardShowMore.id = status;
            myDiv2.append(cardShowMore);
            myContainer.append(title, myDiv2);
        });
    }
};
const myChoice = (status) => {
    let title;
    if (status === "upcoming") {
        title = "En ce moment";
    }
    else if (status === "popular") {
        title = "Populaires";
    }
    else if (status === "top_rated") {
        title = "Les films cultes";
    }
    else {
        title = "On en parle";
    }
    return title;
};
// getMedia(mediaType,status,10, title )
getMedia((mediaType = "movie"), (status = "upcoming"), 2, myChoice(status));
getMedia((mediaType = "movie"), (status = "popular"), 2, myChoice(status));
getMedia((mediaType = "movie"), (status = "top_rated"), 2, myChoice(status));
getMedia((mediaType = "trending/movie"), (status = "week"), 2, myChoice(status));
console.log(status);
const createLinks = () => {
    setTimeout(() => {
        const newTarget = document.querySelectorAll(".card");
        for (let i = 0; i < newTarget.length; i++) {
            newTarget[i].addEventListener('click', () => window.location.href = "./movies.php?id=" + newTarget[i].id);
        }
    }, 500);
};
setTimeout(() => {
    const target = document.querySelectorAll(".card");
    for (let i = 0; i < target.length; i++) {
        target[i].addEventListener('click', () => {
            let idToNumber = Number(target[i].id);
            if (isNaN(idToNumber)) {
                myContainer.innerHTML = `<h2>Ma sélection :</h2>`;
                myContainer.innerHTML += `<a href="./movies.php" class="nav-link btn btn-outline-light border-0 orange  px-3 py-2"><span>Retour<span></a>`;
                if (target[i].id === "week") {
                    getMedia((mediaType = "trending/movie"), (status = "week"), 10, myChoice(status));
                    const newTarget = document.querySelectorAll(".card");
                    // setTimeout(()=> newTarget[i].addEventListener('click', () => window.location.href = "./movies.php?id=" + target[i].id));
                    createLinks();
                }
                else {
                    getMedia((mediaType = "movie"), (target[i].id), 10, myChoice(target[i].id));
                    createLinks();
                }
                // window.location.href = "./movies.php?id=" + target[i].id;
            }
            else {
                window.location.href = "./movies.php?id=" + target[i].id;
            }
        });
    }
}, 500);
