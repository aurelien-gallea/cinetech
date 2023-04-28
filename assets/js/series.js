import search from "./search.js";
import { getMedia } from "./getMedia.js";
import { BtnBackMenu } from "./BtnBackMenu.js";
//fonction du header
search("/search/movie");
let mediaType;
let status;
let count = 10;
if (window.location.href.includes("search")) {
    const btnContainer = document.body.querySelector("#btnContainer");
    if (window.location.href.includes("popular")) {
        getMedia((mediaType = "tv"), (status = "popular"), count, "Séries populaires", true);
    }
    else {
        getMedia((mediaType = "tv"), (status = "top_rated"), count, "Séries cultes", true);
    }
    btnContainer.append(BtnBackMenu(`series`));
}
else {
    getMedia((mediaType = "tv"), (status = "top_rated"), 3, "Séries cultes");
    getMedia((mediaType = "tv"), (status = "popular"), 3, "Séries Populaires");
    getMedia((mediaType = "tv"), (status = "airing_today"), 3, "Aujourd'hui");
    getMedia((mediaType = "tv"), (status = "on_the_air"), 3, "En ce moment");
}
