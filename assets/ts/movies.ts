import search from "./search.js";
import { getMedia } from "./getMedia.js";
import { BtnBackMenu } from './BtnBackMenu.js';


//fonction du header
search("/search/movie");

let mediaType: "tv" | "movie" | "trending/movie";
let status: "top_rated" | "popular" | "upcoming"  | "day" |"week" ;

const myChoice = (status: any) => {
  let title:string;
  if (status === "upcoming") {
    title = "En ce moment";
  } else if (status === "popular") {
    title = "Populaires";
  } else if (status === "top_rated") {
    title = "Les films cultes";
  } else {
    title = "On en parle";
  }
  return title;
}

let count = 10;
if (window.location.href.includes("search")) {
  document.body.querySelector<HTMLDivElement>("#btnContainer")?.prepend(BtnBackMenu("movies"));
  if(window.location.href.includes("upcoming")) {
    getMedia((mediaType = "movie"), (status = "upcoming"), count, myChoice(status), true);
  } else if(window.location.href.includes("popular")) {
    getMedia((mediaType = "movie"), (status = "popular"), count, myChoice(status), true);
  } else if (window.location.href.includes("top_rated")) {
    getMedia((mediaType = "movie"), (status = "top_rated"), count, myChoice(status), true);
  }  else {
    getMedia((mediaType = "movie"), (status = "week"), count, myChoice(status), true);
  }
} else {

  getMedia((mediaType = "movie"), (status = "upcoming"), 2, myChoice(status));
  getMedia((mediaType = "movie"), (status = "popular"), 2, myChoice(status));
  getMedia((mediaType = "movie"), (status = "top_rated"), 2, myChoice(status));
  getMedia((mediaType = "trending/movie"), (status = "week"), 2, myChoice(status));
}

