
/**Petit interlude "variables d'environnement" */

// - une variable d'environnement, c'est une variable dont la valeur est définie par le système d'exploitation
// - dans Node, toutes ces variables sont regroupées dans un objet, disponibles partout et tout le temps : process.env
// console.log(process.env);

// - on peut rajouter des variables d'environnement à volonté
// - on va s'en servir pour laisser le choix de certaines options de config à l'utilisateur (celui qui lance le serveur)
// - par exemple, dans ce projet, le PORT sera définie avec cette méthode

// pour ne pas avoir à retapper les variables d'environnement à chaque lancement, on va utiliser un package npm : dotenv
// Ce package charge les variables d'environnement à partir d'un fichier ".env", qui doit être placé à côté de index.js
require('dotenv').config();



// Point d'entrée de l'application.

// - importer les modules requis
// Par convention et bonne pratique, on met tous les require en haut du fichier.
const express = require('express');
const router = require('./app/router');

// - instancier un serveur express
const app = express();

// - déclarer un PORT (en fait, on va le récupérer depuis les variables d'environnement, en laissant une valeur par défaut "au cas ou")
const PORT = process.env.PORT || 3333;
// astuce de JS : la ligne d'au dessus correespond à 
// if (process.env.PORT !== undefined) {
//     PORT = process.env.PORT;
// } else {
//     PORT = 3333;
// }

// - configurer le serveur express (views, view engine, static)
app.set('views', './app/views');
app.set('view engine', 'ejs');
app.use( express.static(__dirname+'/public') );

// - require (au début du fichier) et use un Router
app.use(router);

// - lancer le serveur / écouter sur le PORT.
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}...`);
});
