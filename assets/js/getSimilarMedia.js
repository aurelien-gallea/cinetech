import apiKey from "./apiKey.js";
export const getSimilar = (mediaType, myId, nbOfPage, myTitle) => {
    const myContainer = document.querySelector("#myContainer");
    const title = document.createElement("h2");
    const alert = document.createElement('div');
    const srcImg = "https://image.tmdb.org/t/p/original";
    const notFindImg = "./assets/images/not-find.jpg";
    // personnalisation
    title.classList.add("my-5", "align-self-start", "container");
    title.textContent = myTitle;
    const myDiv2 = document.createElement("div");
    myDiv2.classList.add("d-flex", "w-100", "overflow-auto", "gap-2", "rounded");
    for (let i = 1; i <= nbOfPage; i++) {
        fetch(`https://api.themoviedb.org/3/${mediaType}/${myId}/similar?api_key=${apiKey}&language=fr-FR&page=${i}`)
            .then(response => response.json())
            .then((data) => {
            if (data.total_results === 0) {
                alert.classList.add("alert", "alert-warning", "text-center", "my-5");
                alert.innerHTML = '<p>Aucun contenu similaire trouvé !</p>';
                myDiv2.classList.remove("w-100");
                myDiv2.append(alert);
            }
            else {
                for (const key in data.results) {
                    if (data.results[key].vote_count >= 10) {
                        // création d'une carte pour chaque contenu
                        const myCard = document.createElement("a");
                        myCard.classList.add("card", "justify-content-between", "bg-black", "nav-link");
                        myCard.style.minWidth = "200px";
                        myCard.style.maxWidth = "300px";
                        myCard.id = data.results[key].id;
                        if (mediaType === "movie") {
                            myCard.href = "movies.php?id=" + myCard.id;
                        }
                        else if (mediaType === "tv") {
                            myCard.href = "series.php?id=" + myCard.id;
                        }
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
            }
            // appel
            myContainer.append(title, myDiv2);
        })
            .catch(error => console.log(error));
    }
};
