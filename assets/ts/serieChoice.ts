import search from "./search.js";
import apiKey from "./apiKey.js";
// rechercher ----------
console.log(search);
const searchBar = document.querySelector("#searchBar") as HTMLInputElement;
const button: HTMLInputElement = document.querySelector(
  "#button"
) as HTMLInputElement;
const myContainer = document.querySelector("#myContainer") as HTMLDivElement;
const srcImg: string = "https://image.tmdb.org/t/p/original";
const notFindImg: string = "./assets/images/not-find.jpg";

//fonction du header
search("/search/movie");

let mediaType: "tv" | "movie";
let status: "top_rated" | "popular" | "upcoming";
const title = document.querySelector(".param") as HTMLHeadingElement;


const getOneMedia = (mediaType: string): void => {
  // creation

  // personnalisation

  fetch(
    `https://api.themoviedb.org/3/${mediaType}/${title.id}?api_key=${apiKey}&language=fr-FR`
  )
    .then((response) => response.json())

    .then((data) => {
      console.log(data);
      title.textContent = data.title;
      const myDiv2 = document.createElement("div");

      const myCard = document.createElement("div") as HTMLDivElement;
      const resume = document.createElement("div") as HTMLDivElement;

      myCard.classList.add("card");
      myCard.style.minWidth = "200px";

      myCard.innerHTML = `
                    
                    
                    
                    ${
                      !data.poster_path
                        ? !data.profile_path
                          ? `<div><img class="img-fluid card-img-top" src=${notFindImg} alt="not found image"></div>`
                          : `<div><img class="img-fluid card-img-top" src=${
                              srcImg + data.profile_path
                            } alt="not found image"></div>`
                        : `<div><img class="img-fluid card-img-top" src=${
                            srcImg + data.poster_path
                          } alt="not found image"></div>`
                    }
                    
                    
                    
                    ${
                      !data.overview && data.media_type === "person"
                        ? '<div class="card-footer"><span class="badge fs-4 text-end text-black">Popularity :' +
                          data.popularity +
                          "</span></div>"
                        : '<div class="card-footer"><span class="badge fs-4 text-end text-black"> Score : <span>' +
                          data.vote_average +
                          "</span></span></div>"
                    }
                
                `;
      let arrayGenres = [];
      for (const key in data.genres) {
        arrayGenres.push(data.genres[key].name);
      }
      resume.innerHTML += `<div><b>Résumé : </b>${data.overview}`;
      resume.innerHTML += `<div><b>Genres : </b>${arrayGenres.join(
        ", "
      )}</div>`;
      resume.innerHTML += `<div><b>date de sortie 1er épisode: </b>${data.first_air_date}</div>`;
      resume.innerHTML += `<div><b>date de sortie dernier épisode: </b>${data.last_episode_to_air.air_date}</div>`;
      resume.innerHTML += `<div><b>Nb de saisons : </b>${data.number_of_seasons}</div>`;
      resume.innerHTML += `<div><b>Nb d'épisodes : </b>${data.number_of_episodes}</div>`;
      resume.innerHTML += `<div><b>Popularité : </b>${data.popularity}</div>`;
     
      resume.innerHTML += `<div><b>Distribué par : </b>${data.networks[0].name}</div>`;
      resume.innerHTML += `<div><b>En production : </b>${data.in_production ? "Oui" : "Non" }</div>`;
      myDiv2.classList.add(
        "d-flex",
        "gap-3",
        "flex-column",
        "flex-md-row",
        "col-lg-10",
        
      );
      resume.classList.add("col-sm-8", "border", "rounded", "p-3" );
      // appel
      myDiv2.append(myCard, resume);
      myContainer.append(title, myDiv2);
    });
};

getOneMedia("tv");
