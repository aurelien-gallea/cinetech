import apiKey from "./apiKey.js";
// rechercher ----------
const form = document.querySelector("#searchForm");
const searchBar = document.querySelector("#searchBar");
const button = document.querySelector("#button");
const myContainer = document.querySelector("#myContainer");
const srcImg = "https://image.tmdb.org/t/p/w300";
const notFindImg = "./assets/images/not-find.jpg";
let mediaType;
const findSomething = (mediaType, page) => {
    let range; // avoir
    const myContainer = document.querySelector("#myContainer");
    const title = document.querySelector(".param");
    const notFindImg = "./assets/images/not-find.jpg";
    const srcImg = "https://image.tmdb.org/t/p/original";
    fetch(`https://api.themoviedb.org/3/search/${mediaType}?api_key=${apiKey}&query=${searchBar.value}`)
        .then((response) => response.json())
        .then((data) => {
        range = data.total_pages; // a voir
        console.log(range); // a voir
        console.log(data);
        for (const key in data.results) {
            let newMediaType = data.results[key].media_type;
            let idMedia = data.results[key].id;
            console.log("id :" + idMedia);
            fetch(`https://api.themoviedb.org/3/${newMediaType}/${idMedia}?api_key=${apiKey}&query=${searchBar.value}&language=fr-FR&page=${page}`)
                .then((response) => response.json())
                .then((data) => {
                console.log(data);
                console.log(data.name);
                const myDiv2 = document.createElement("div");
                const myCard = document.createElement("a");
                myCard.classList.add("card", "justify-content-between", "bg-black", "nav-link");
                myCard.style.minWidth = "200px";
                myCard.style.maxWidth = "300px";
                myCard.id = data.id;
                let title = "";
                if (newMediaType === "movie") {
                    myCard.href = "movies.php?id=" + myCard.id;
                    title = data.title;
                }
                else if (newMediaType === "tv") {
                    myCard.href = "series.php?id=" + myCard.id;
                    title = data.name;
                }
                else if (newMediaType === "trending/movie") {
                    myCard.href = "movies.php?id=" + myCard.id;
                    title = data.title;
                }
                else if (newMediaType === "person") {
                    myCard.href = "actors.php?id=" + myCard.id;
                    title = data.name;
                }
                myCard.innerHTML += `
                      
                      
                      <div class="text-center fs-5 py-2"><span >${title}</span></div>
                      ${!data.poster_path
                    ? !data.profile_path
                        ? `<div><img class="img-fluid card-img-top" src=${notFindImg} alt="not found image"></div>`
                        : `<div><img class="img-fluid card-img-top" src=${srcImg + data.profile_path} alt="not found image"></div>`
                    : `<div><img class="img-fluid card-img-top" src=${srcImg + data.poster_path} alt="not found image"></div>`}
                      
                      
                      
                      ${!data.overview &&
                    data.media_type !== "person"
                    ? '<div class="card-footer bg-light"><span class="fw-bold fs-6 text-end text-black">Popularity :' +
                        data.popularity.toFixed(0) +
                        "</span></div>"
                    : '<div class="card-footer bg-light"><span class="fw-bold fs-6 text-end text-black"> Score : <span>' +
                        data.vote_average.toFixed(1) +
                        "</span></span></div>"}
                  
                  `;
                myDiv2.classList.add("d-flex", "gap-3", "flex-column", "flex-md-row");
                // appel
                myDiv2.append(myCard);
                myContainer.append(myDiv2);
            })
                .catch((error) => {
                console.log(error);
                // myContainer.innerHTML = "<h1>404 cette page n'existe pas</h1>";
            });
        }
    });
};
// On autorise le formulaire qu'avec un minimum de 3 caractères
searchBar.addEventListener("keyup", () => {
    if (searchBar.value.length < 2) {
        searchBar.placeholder = "2 caractères minimum...";
        searchBar.classList.add("text-danger");
        button.style.cursor = "not-allowed";
        button.classList.remove("orange");
    }
    else {
        button.style.cursor = "pointer";
        searchBar.classList.remove('text-danger', "bg-black");
        button.classList.add("orange");
    }
});
// on annule le formulaire pour pouvoir valider via entrer et empecher la redirection
form.addEventListener('submit', (e) => e.preventDefault());
button.addEventListener("click", () => {
    if (searchBar.value.length >= 2) {
        myContainer.innerHTML = "";
        findSomething("multi", 1);
    }
    else {
        searchBar.classList.add("bg-black");
        searchBar.value = "";
    }
});
export default findSomething;
