
const pg = require('pg');


const client = new pg.Client({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

// 3. on va dire à ce client "connecte toi !"
client.connect();


// Ce controlleur a pour rôle d'afficher les informations relatives aux promos, donc : 
// - la listes des promos
// - les détails d'une promo



// On récupère les infos des promos dans le json
const promosJSON = require('../../data/promos.json');
// pareil pour les étudiants
const studentsJSON = require('../../data/students.json');

const promoController = {

    allPromosPage: (req, res) => {
        // ici : récupérer les infos des promos (bah en fait c'est fait !)
        // puis render la view qui va bien.

        client.query('SELECT * FROM promo', (err, data) => {
                console.log("ERROR : ", err);
                // data contient plusieurs infos intéressantes : 
                //  - data.rowCount contient le NOMBRE de résultat
                //  - data.rows contient les vrais résultats. Bonne nouvelle : ces résultats sont des objets JS !!
                console.log(data.rows);
                
                res.render('promosList', {
                    promos: data.rows,
                });
             });
        
    },

    detailPromoPage: (req, res, next) => {
        // récupérer l'id ciblé
        const targetId = parseInt(req.params.id);

        client.query(`SELECT * FROM promo WHERE ID = ${targetId}`, (err, data) => {
          //  console.log("ERROR : ", err);
            // data contient plusieurs infos intéressantes : 
            //  - data.rowCount contient le NOMBRE de résultat
            //  - data.rows contient les vrais résultats. Bonne nouvelle : ces résultats sont des objets JS !!
           // console.log(data.rows);
            
            const promo = data.rows[0];
            console.log(promo);
            //console.log(targetId);

            client.query(`SELECT * FROM student WHERE promo_id = ${targetId}`, (err, data2) => {
               // console.log("ERROR : ", err);
                // data contient plusieurs infos intéressantes : 
                //  - data.rowCount contient le NOMBRE de résultat
                //  - data.rows contient les vrais résultats. Bonne nouvelle : ces résultats sont des objets JS !!
              //  console.log(data2.rows);
                
             
                      // récupérer la liste des étudiants de la promo
                const students = data2.rows;
                if (promo) {
                    res.render('promoDetails', {
                        promo,
                        students
                    });
                } else {
                    // sinon, on veut renvoyer une 404.
                    // pour ça, le plus simple c'est de laisser express continuer la chaine de middleware
                    next();
                }
    
                
             });


            
         });


       
    }
    
};

module.exports = promoController;