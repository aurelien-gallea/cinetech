"use strict";
let arrayMovie = [];
let arraySerie = [];
let arrayActor = [];
fetch("./src/myFavorites.php")
    .then((response) => response.json())
    .then((data) => {
    console.log(data);
    for (const key in data) {
        if (data[key].id_movie !== null) {
            arrayMovie.push(data[key].id_movie);
        }
        else if (data[key].id_serie !== null) {
            arraySerie.push(data[key].id_serie);
        }
        else if (data[key].id_actor !== null) {
            arrayActor.push(data[key].id_actor);
        }
    }
    console.log(' films :' + arrayMovie);
    console.log('séries : ' + arraySerie);
    console.log(' acteurs : ' + arrayActor);
});
