import search from "./search.js";
import { getSimilar } from "./getSimilarMedia.js";
import { getOneMedia } from './getOneMedia.js';
import { BtnBackMenu, BtnBack } from './BtnBackMenu.js';
import { getVideo } from "./getVideo.js";
import apiKey from "./apiKey.js";
//fonction du header
search("/search/movie");
//  on recupère l'id du film/serie
const getId = () => window.location.href.split("=")[1];
let direction = "";
let mediaType = "";
if (window.location.href.includes("series")) {
    direction = "series";
    mediaType = "tv";
}
if (window.location.href.includes("movies")) {
    direction = "movies";
    mediaType = "movie";
}
document.body.querySelector("#btnContainer")?.prepend(BtnBackMenu(direction), BtnBack());
// récupérer le casting
let casting = [];
fetch(`https://api.themoviedb.org/3/${mediaType}/${getId()}/credits?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
    if (data.cast.length > 0) {
        for (const key in data.cast) {
            casting.push(data.cast[key].name);
        }
    }
})
    .catch(error => console.log(error));
// on met un délais d'execution pour être sûr de tout avoir dans le bon ordre
setTimeout(() => getOneMedia(mediaType, getId(), casting), 150);
// l'affichages des suggestions + liens
setTimeout(() => getVideo(mediaType, getId()), 300);
setTimeout(() => getSimilar(mediaType, getId(), 3, "Vous pourriez aimer"), 450);
