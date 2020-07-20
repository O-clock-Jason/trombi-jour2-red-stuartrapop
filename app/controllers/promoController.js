const pg = require('pg');


const client = new pg.Client({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});


client.connect();


// Ce controlleur a pour rôle d'afficher les informations relatives aux promos, donc : 
// - la listes des promos
// - les détails d'une promo



// On récupère les infos des promos dans le json
//const promosJSON = require('../../data/promos.json');
// pareil pour les étudiants
//const studentsJSON = require('../../data/students.json');

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
        const targetId = parseInt(req.params.id);
        const query = `SELECT * FROM "promo" WHERE ID = ${targetId}`;
        client.query(query, (err, data) => {
            const promo = data.rows[0];
            client.query(`SELECT * FROM "student" WHERE "promo_id" = ${targetId}`, (err, data2) => {
                const students = data2.rows;
                if (promo) {
                    res.render('promoDetails', {
                        promo,
                        students
                    });
                } else {
                    next();
                }
            });
        });
    }
};

module.exports = promoController;