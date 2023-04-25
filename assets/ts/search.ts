import apiKey from "./apiKey.js";

// rechercher ----------
const searchBar = document.querySelector("#searchBar") as HTMLInputElement;
const button: HTMLInputElement = document.querySelector(
  "#button"
) as HTMLInputElement;
const myContainer = document.querySelector("#myContainer") as HTMLDivElement;
const srcImg: string = "https://image.tmdb.org/t/p/w300";
const notFindImg: string = "./assets/images/not-find.jpg";
const searchMovie: string = "search/movie";
const searchCollection: string = "search/collection";
const searchPeople: string = "search/person";
const searchMulti: string = "search/multi";

const findSomething = (searchParameter: string) => {
  let range: number; // avoir
  fetch(
    `https://api.themoviedb.org/3/${searchParameter}?api_key=${apiKey}&query=${searchBar.value}`
  )
    .then((response) => response.json())
    .then((data) => {
      range = data.total_pages; // a voir
      console.log(range); // a voir
      console.log(data);
      for (let i = 1; i <= range; i++) {
        fetch(
          `https://api.themoviedb.org/3/${searchParameter}?api_key=${apiKey}&query=${searchBar.value}&page=${i}`
        )
          .then((response) => response.json())
          .then((data) => {
            const myDiv2 = document.createElement("div");

            for (const key in data.results) {
              myDiv2.innerHTML += `<div class="text-dark card myCard" style="max-width: 300px" id="${data.results[key].id}">
        <div class="card-header d-flex justify-content-between align-items-center">
        <h3>${
          !data.results[key].title
            ? data.results[key].name
            : data.results[key].title
        }</h3></div>
        
              
              ${!data.results[key].poster_path ? 
                
                !data.results[key].profile_path ? `<div><img class="img-fluid" src=${notFindImg} alt="not found image"></div>`
                :
                  `<div><img class="img-fluid" src=${srcImg + data.results[key].profile_path} alt="not found image"></div>`
                
              :
                `<div><img class="img-fluid" src=${srcImg + data.results[key].poster_path} alt="not found image"></div>`
              }
              

              
              ${!data.results[key].overview && data.results[key].media_type === "person" ? 
                  ( '<div class="card-footer"><span class="badge fs-3 text-end text-black">Popularity :' +  data.results[key].popularity +"</span></div>")
                : ( '<div class="card-footer"><span class="badge fs-3 text-end text-black"> Score : <span>' + data.results[key].vote_average + "</span></span></div>")
              }
            
            </div>`;
            myDiv2.classList.add(
              "d-flex",
              "flex-wrap",
              "justify-content-center", "gap-5"
            );

            myContainer.append(myDiv2);
          };
      })
    };
});
}
button.addEventListener("click", () => {
  myContainer.innerHTML = "";
  findSomething(searchMovie);
});

export default findSomething;