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

const btnBack = document.querySelector("#btnBack") as HTMLDivElement;
btnBack.addEventListener('click', () => window.history.back());
// si l'image n'existe pas on en met une de base
const notFindImg: string = "./assets/images/not-find.jpg";

//fonction du header
search("/search/movie");

let mediaType: "tv" | "movie";
let status: "top_rated" | "popular" | "upcoming" | "latest";

// recuperation de l'id : 2 méthodes
// envoyé par le back
const title = document.querySelector(".param") as HTMLHeadingElement;
// recupéré via le front
const getId = () : string => window.location.href.split("=")[1];

const getOneMedia = (mediaType: string): void => {
  // creation

  // personnalisation

  fetch(
    `https://api.themoviedb.org/3/${mediaType}/${getId()}?api_key=${apiKey}&language=fr-FR`
  )
    .then((response) => response.json())

    .then((data) => {
      console.log(data);
      title.textContent = data.title;
      const myDiv2 = document.createElement("div");

      const myCard = document.createElement("div") as HTMLDivElement;
      const resume = document.createElement("div") as HTMLDivElement;

      const getDateToFrench = (date :string) : string => new Date(date).toLocaleDateString("fr-FR");

      console.log(getDateToFrench(data.release_date));
      myCard.classList.add("card", "border-0", "bg-dark");
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
                        ? '<div class="card-footer bg-light"><span class="fw-bold fs-6 text-end text-black">Popularity :' +
                          data.popularity.toFixed(0) +
                          "</span></div>"
                        : '<div class="card-footer bg-light"><span class="fw-bold fs-6 text-end text-black"> Score : <span>' +
                          data.vote_average.toFixed(1) +
                          "</span></span></div>"
                    }
                
                `;
      let arrayGenres : string[] = [];
      for (const key in data.genres) {
        arrayGenres.push(data.genres[key].name);
      }
      let arrayProductions : string[] = [];
      for (const key in data.production_companies) {
        arrayProductions.push(data.production_companies[key].name);
      }
      console.log(arrayProductions);
      let profit: number = data.revenue - data.budget;

      // rendre les chiffres plus lisibles
      const numberToMillion = (myNumber : number) => myNumber >= 1000000 || myNumber <= 1000000 && myNumber < 0 ? (myNumber / 1000000).toFixed(2) + " millions" : myNumber;

      resume.innerHTML += `<div><b>Genres : </b>${arrayGenres.join(", ")}</div>`;
      resume.innerHTML += `<div><b>Durée : </b>${data.runtime} min</div>`;
      resume.innerHTML += `<div><b>date de sortie : </b>${getDateToFrench(data.release_date)}</div>`;
      resume.innerHTML += `<div class="my-2"><b>Résumé : </b>${data.overview.length === 0 ? "désolé aucun résumé n'est disponible !" : data.overview}`;
      arrayProductions.length === 0 ? null : resume.innerHTML += `<div><b>Production : </b>${arrayProductions.join(', ')}`;
      resume.innerHTML += `<div><b>Popularité : </b>${data.popularity.toFixed(0)}</div>`;
      data.budget === 0 ? null : resume.innerHTML +=  `<div><b>Budget : </b>${numberToMillion(data.budget)} $</div>`;
      data.revenue === 0 || data.budget === 0 ? null : resume.innerHTML += `<div><b>Profit : </b>${profit === 0 ? "inconnu" : numberToMillion(profit) + " $"} </div>`;
      myDiv2.classList.add(
        "d-flex",
        "gap-3",
        "flex-column",
        "flex-md-row",
        "col-lg-10",
        
      );
      resume.classList.add("col-md-8", "border", "border-secondary", "rounded", "p-3" );
      // appel
      myDiv2.append(myCard, resume);
      myContainer.append(title, myDiv2);
    });
};

getOneMedia("movie");
