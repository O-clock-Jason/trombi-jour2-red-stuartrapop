// - require express
const express = require('express');

// - require les controllers
const mainController = require('./controllers/mainController');
const promoController = require('./controllers/promoController');

// - instancier le router
const router = express.Router();

// - créer des routes, y brancher des méthodes issues des controlleurs
//   - page d'accueil : route '/'
router.get('/', mainController.homePage);
//   - liste des promos: route '/promos'
router.get('/promos', promoController.allPromosPage);
//   - détail d'une promo: route '/promo/:id'
router.get('/promo/:id', promoController.detailPromoPage);


// EN DERNIER : on met la fonction (c'est un middleware) qui gère les 404.
// si aucune route ne capture l'url demandé, alors on tombera forcément dans cette fonction => et paf, message d'erreur
router.use(mainController.notFound);


// - exporter le router
module.exports = router;