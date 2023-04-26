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
const getMedia = (mediaType, status, myTitle) => {
    // creation
    const title = document.createElement("h2");
    // personnalisation
    title.classList.add("my-5", "align-self-start", "container");
    title.textContent = myTitle;
    fetch(`https://api.themoviedb.org/3/${mediaType}/${status}?api_key=${apiKey}&language=fr-FR&page=1`)
        .then((response) => response.json())
        .then((data) => {
        const myDiv2 = document.createElement("div");
        for (const key in data.results) {
            if (data.results[key].vote_count >= 10) {
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
                    
                    
                    
                    ${!data.results[key].overview &&
                    data.results[key].media_type === "person"
                    ? '<div class="card-footer bg-light"><span class="fw-bold fs-6 text-end text-black">Popularity :' +
                        data.results[key].popularity.toFixed(0) +
                        "</span></div>"
                    : '<div class="card-footer bg-light"><span class="fw-bold fs-6 text-end text-black"> Score : <span>' +
                        data.results[key].vote_average.toFixed(1) +
                        "</span></span></div>"}
                
                `;
                myDiv2.classList.add("d-flex", "w-100", "overflow-auto", "gap-2", "rounded");
                // appel
                myDiv2.append(myCard);
                myContainer.append(title, myDiv2);
            }
        }
    });
};
getMedia((mediaType = "tv"), (status = "top_rated"), "Séries cultes");
getMedia((mediaType = "tv"), (status = "popular"), "Populaires");
setTimeout(() => {
    const target = document.querySelectorAll(".card");
    console.log(target);
    for (let i = 0; i < target.length; i++) {
        target[i].addEventListener('click', () => {
            console.log(target[i].id);
            window.location.href = "./series.php?id=" + target[i].id;
        });
    }
}, 500);
