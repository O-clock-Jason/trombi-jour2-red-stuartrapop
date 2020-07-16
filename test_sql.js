// 0. on charge les variables d'environnement
require('dotenv').config();

// 1. on récupère le module pour se connecter à la BDD
const pg = require('pg');

// REMARQUE, on peut aller plus vite avec le destructuring
// const {Client} = require('pg');
// C'est excatement la meme chose que faire : 
// const pg = require('pg');
// const Client = pg.Client;

// 2. on va créer un client à partir de ce module
const client = new pg.Client({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

// 3. on va dire à ce client "connecte toi !"
client.connect();

// 4. on va utiliser le client pour faire des requetes SQL
// pour ce faire, on va utiliser la méthode client.query

// SAUF QUE, la méthode client.query NE RENVOIE RIEN !... ou en tout cas, rien qu'on sache utiliser...

// En fait, comme on ne sait pas combien de temps la BDD va mettre à répondre, et qu'on veut pouvoir continuer à faire des choses pendant ce temps là, on doit définir un CALLBACK 

// Ce CALLBACK sera executée lorsque la bdd aura fini de traiter la requête
// Les callbacks du module PG respectent le format des callbacks standard de NodeJS, c'est à dire:
// 2 paramètres, toujours dans le même ordre: error, data
// L'important à se rappeller, c'est que le premier paramètre sera TOUJOURS une erreur potentielle

client.query('SELECT * FROM promo', (err, data) => {
    console.log("ERROR : ", err);
    // data contient plusieurs infos intéressantes : 
    //  - data.rowCount contient le NOMBRE de résultat
    //  - data.rows contient les vrais résultats. Bonne nouvelle : ces résultats sont des objets JS !!
    console.log(data.rows);

    // Si, par exemple, je veux refaire une requete SQL, après la premiere :
    // Je la fait ici, comme ceci : 
    client.query('SELECT * FROM student', (err2, data2) => {
        // ici, j'ai donc accès à "data" qui contient les résultats de la première requete, et à "data2" qui contient les résultats de la 2ème requete !

        // et pour une 3ème ? bah on continue les poupées russes ! 
        // client.query(...)
    });
});


console.log("bonjour");

