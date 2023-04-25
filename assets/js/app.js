import apiKey from "./apiKey.js";
// const url: string = `https://api.themoviedb.org/3/movie/551?api_key=${apiKey}&language=en-US`;
// const range = 500;
// for (let i = 1; i <= range; i++) {
//   const page = i;
//   const popularMovies: string = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=${page}`;
//   // const title = document.createElement("h2");
//   fetch(popularMovies)
//   .then((resp) => resp.json())
//   .then((resp) => {
//     // title.textContent = `Page numéro : ${page}`;
//     // title.classList.add("text-center");
//     // document.body.appendChild(title);
//     const myDiv2 = document.createElement("div");
//     for (const key in resp.results) {
//       let colorScore: number = resp.results[key].vote_average;
//       let color: string;
//       if (colorScore >=8 && resp.results[key].vote_count >= 10 ) {
//           console.log(resp.results[key]);
//           colorScore <6 ? color = "text-danger" : color = "text-success";
//           myDiv2.innerHTML += `<div class="card p-0 m-5" style="max-width: 400px">
//           <div class="card-header d-flex justify-content-between align-items-center">
//           <h2>${resp.results[key].title}</h2></div>
//           <div>
//           <img class="img-fluid" src="https://image.tmdb.org/t/p/w400${resp.results[key].poster_path}"></img></div>
//           <div class="card-body">
//           <p>${resp.results[key].overview}</p></div>
//           <p class="badge fs-3 text-end text-black"> Score : <span class="${color}">${resp.results[key].vote_average}</span></p></div>`;
//         }
//         }
//         myDiv2.classList.add("d-flex","flex-wrap", "justify-content-center");
//         document.body.append(myDiv2);
//       });
// }
// rechercher ----------
const searchBar = document.querySelector("#searchBar");
const button = document.querySelector("#button");
const myContainer = document.querySelector("#myContainer");
const srcImg = "https://image.tmdb.org/t/p/w300";
const notFindImg = "./assets/images/not-find.jpg";
const searchMovie = "search/movie";
const searchCollection = "search/collection";
const searchPeople = "search/person";
const searchMulti = "search/multi";
const findSomething = (searchParameter) => {
    let range; // avoir
    fetch(`https://api.themoviedb.org/3/${searchParameter}?api_key=${apiKey}&query=${searchBar.value}`)
        .then((response) => response.json())
        .then((data) => {
        range = data.total_pages; // a voir
        console.log(range); // a voir
        console.log(data);
        for (let i = 1; i <= range; i++) {
            fetch(`https://api.themoviedb.org/3/${searchParameter}?api_key=${apiKey}&query=${searchBar.value}&page=${i}`)
                .then((response) => response.json())
                .then((data) => {
                const myDiv2 = document.createElement("div");
                for (const key in data.results) {
                    myDiv2.innerHTML += `<div class="card" style="max-width: 300px">
        <div class="card-header d-flex justify-content-between align-items-center">
        <h3>${!data.results[key].title
                        ? data.results[key].name
                        : data.results[key].title}</h3></div>
        
              
              ${!data.results[key].poster_path ?
                        !data.results[key].profile_path ? `<div><img class="img-fluid" src=${notFindImg} alt="not found image"></div>`
                            :
                                `<div><img class="img-fluid" src=${srcImg + data.results[key].profile_path} alt="not found image"></div>`
                        :
                            `<div><img class="img-fluid" src=${srcImg + data.results[key].poster_path} alt="not found image"></div>`}
              

              
              ${!data.results[key].overview && data.results[key].media_type === "person" ?
                        ('<div class="card-footer"><span class="badge fs-3 text-end text-black">Popularity :' + data.results[key].popularity + "</span></div>")
                        : ('<div class="card-footer"><span class="badge fs-3 text-end text-black"> Score : <span>' + data.results[key].vote_average + "</span></span></div>")}
            
            </div>`;
                    myDiv2.classList.add("d-flex", "flex-wrap", "justify-content-center", "gap-5");
                    myContainer.append(myDiv2);
                }
                ;
            });
        }
        ;
    });
};
button.addEventListener("click", () => {
    myContainer.innerHTML = "";
    findSomething(searchMulti);
});
