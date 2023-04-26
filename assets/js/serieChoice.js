import search from "./search.js";
import apiKey from "./apiKey.js";
// rechercher ----------
console.log(search);
const searchBar = document.querySelector("#searchBar");
const button = document.querySelector("#button");
const myContainer = document.querySelector("#myContainer");
const srcImg = "https://image.tmdb.org/t/p/original";
const btnBack = document.querySelector("#btnBack");
btnBack.addEventListener('click', () => window.history.back());
const notFindImg = "./assets/images/not-find.jpg";
//fonction du header
search("/search/movie");
const title = document.querySelector(".param");
//  on recupère l'id du film/serie
const getId = () => window.location.href.split("=")[1];
const getOneMedia = (mediaType) => {
    fetch(`https://api.themoviedb.org/3/${mediaType}/${getId()}?api_key=${apiKey}&language=fr-FR`)
        .then((response) => response.json())
        .then((data) => {
        console.log(data);
        title.textContent = data.title;
        const myDiv2 = document.createElement("div");
        const myCard = document.createElement("div");
        const resume = document.createElement("div");
        const getDateToFrench = (date) => new Date(date).toLocaleDateString("fr-FR");
        myCard.classList.add("card", "border-0", "bg-dark");
        myCard.style.minWidth = "200px";
        myCard.innerHTML = `
                    
                    
                    
                    ${!data.poster_path
            ? !data.profile_path
                ? `<div><img class="img-fluid card-img-top" src=${notFindImg} alt="not found image"></div>`
                : `<div><img class="img-fluid card-img-top" src=${srcImg + data.profile_path} alt="not found image"></div>`
            : `<div><img class="img-fluid card-img-top" src=${srcImg + data.poster_path} alt="not found image"></div>`}
                    
                    
                    
                    ${!data.overview && data.media_type === "person"
            ? '<div class="card-footer bg-light"><span class="badge fs-4 text-end text-black">Popularity :' +
                data.popularity.toFixed(0) +
                "</span></div>"
            : '<div class="card-footer bg-light"><span class="badge fs-4 text-end text-black"> Score : <span>' +
                data.vote_average.toFixed(1) +
                "</span></span></div>"}
                
                `;
        let arrayGenres = [];
        for (const key in data.genres) {
            arrayGenres.push(data.genres[key].name);
        }
        let arrayNetworks = [];
        for (const key in data.networks) {
            arrayNetworks.push(data.networks[key].name);
        }
        let arrayProductions = [];
        for (const key in data.production_companies) {
            arrayProductions.push(data.production_companies[key].name);
        }
        resume.innerHTML += `<div><b>Genres : </b>${arrayGenres.join(", ")}</div>`;
        resume.innerHTML += `<div><b>date de sortie 1er épisode: </b>${getDateToFrench(data.first_air_date)}</div>`;
        resume.innerHTML += `<div><b>date de sortie dernier épisode: </b>${getDateToFrench(data.last_episode_to_air.air_date)}</div>`;
        resume.innerHTML += `<div><b>Nb de saisons : </b>${data.number_of_seasons}</div>`;
        resume.innerHTML += `<div><b>Nb d'épisodes : </b>${data.number_of_episodes}</div>`;
        resume.innerHTML += `<div class="my-2"><b>Résumé : </b>${data.overview.length === 0 ? "désolé aucun résumé n'est disponible !" : data.overview}`;
        arrayProductions.length === 0 ? null : resume.innerHTML += `<div><b>Production : </b>${arrayProductions.join(', ')}`;
        resume.innerHTML += `<div><b>Popularité : </b>${data.popularity.toFixed(0)}</div>`;
        resume.innerHTML += `<div><b>Distribué par : </b>${arrayNetworks.join(', ')}</div>`;
        resume.innerHTML += `<div><b>En production : </b>${data.in_production ? "Oui" : "Non"}</div>`;
        myDiv2.classList.add("d-flex", "gap-3", "flex-column", "flex-md-row", "col-lg-10");
        resume.classList.add("col-lg-8", "border", "border-secondary", "rounded", "p-3");
        // appel
        myDiv2.append(myCard, resume);
        myContainer.append(title, myDiv2);
    });
};
getOneMedia("tv");
