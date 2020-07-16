
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
        res.render('promosList', {
            promos: promosJSON
        });
    },

    detailPromoPage: (req, res, next) => {
        // récupérer l'id ciblé
        const targetId = parseInt(req.params.id);

        // récupérer les données de la promo concernée
        const promo = promosJSON.find( (element) => {
            return element.id === targetId;
        });

        // récupérer la liste des étudiants de la promo
        const students = studentsJSON.filter( (student) => {
            return student.promo === targetId;
        });

        // si on a trouvé une promo, envoyer toutes ces données dans une view
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
    }
    
};

module.exports = promoController;