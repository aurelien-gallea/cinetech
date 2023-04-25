import search from "./search.js";
import apiKey from "./apiKey.js";
// rechercher ----------
console.log(search);
const searchBar = document.querySelector("#searchBar") as HTMLInputElement;
const button: HTMLInputElement = document.querySelector(
  "#button"
) as HTMLInputElement;
const myContainer = document.querySelector("#myContainer") as HTMLDivElement;
const srcImg: string = "https://image.tmdb.org/t/p/w300";
const notFindImg: string = "./assets/images/not-find.jpg";

//fonction du header
search("/search/movie");

let mediaType: "tv" | "movie";
let status: "top_rated" | "popular" | "upcoming";

const getMedia = (mediaType: string, status: string, myTitle: string): void => {
  // creation
  const title = document.createElement("h2") as HTMLHeadingElement;

  // personnalisation
  title.classList.add("my-5", "align-self-start", "container");
  title.textContent = myTitle;

  fetch(
    `https://api.themoviedb.org/3/${mediaType}/${status}?api_key=${apiKey}&language=fr-FR&page=1`
  )
    .then((response) => response.json())

    .then((data) => {
      const myDiv2 = document.createElement("div");
      for (const key in data.results) {
        if (data.results[key].vote_count >= 10) {
          const myCard = document.createElement("div") as HTMLDivElement;

          myCard.classList.add("card");
          myCard.style.minWidth = "200px";
          myCard.style.cursor = "pointer";
          myCard.id = data.results[key].id;

          myCard.innerHTML += `
                    
                    
                    
                    ${
                      !data.results[key].poster_path
                        ? !data.results[key].profile_path
                          ? `<div><img class="img-fluid card-img-top" src=${notFindImg} alt="not found image"></div>`
                          : `<div><img class="img-fluid card-img-top" src=${
                              srcImg + data.results[key].profile_path
                            } alt="not found image"></div>`
                        : `<div><img class="img-fluid card-img-top" src=${
                            srcImg + data.results[key].poster_path
                          } alt="not found image"></div>`
                    }
                    
                    
                    
                    ${
                      !data.results[key].overview &&
                      data.results[key].media_type === "person"
                        ? '<div class="card-footer"><span class="badge fs-3 text-end text-black">Popularity :' +
                          data.results[key].popularity +
                          "</span></div>"
                        : '<div class="card-footer"><span class="badge fs-3 text-end text-black"> Score : <span>' +
                          data.results[key].vote_average +
                          "</span></span></div>"
                    }
                
                `;
          myDiv2.classList.add("d-flex", "w-100", "overflow-auto");

          // appel
          myDiv2.append(myCard);
          myContainer.append(title, myDiv2);
          
        }
      }
      
    });
};

getMedia((mediaType = "tv"), (status = "upcoming"), "En salles");
getMedia((mediaType = "tv"), (status = "popular"), "Populaires");

setTimeout(() => {

    const target = document.querySelectorAll(".card");
    
    console.log(target);
    for (let i = 0;  i < target.length; i++) {
        target[i].addEventListener('click', () => {
            console.log(target[i].id);
            window.location.href = "./series.php?id=" + target[i].id;
            
    })
        
    }
    
}
,500)
