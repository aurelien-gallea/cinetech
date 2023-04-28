import search from "./search.js";
import { getMedia } from "./getMedia.js";

//fonction du header
search("multi",1);

let mediaType: "tv" | "movie";
let status: "top_rated" | "popular" | "latest" |"airing_today" |"on_the_air" ;


  getMedia((mediaType = "tv"), (status = "popular"), 3, "Séries Populaires");
  getMedia((mediaType = "movie"), (status = "popular"), 2, "Films Populaires");
  getMedia((mediaType = "tv"), (status = "top_rated"), 3, "Séries cultes");
  getMedia((mediaType = "movie"), (status = "top_rated"), 2, "Films Cultes");
  

