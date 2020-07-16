
// Ce "controlleur" est un objet qui contient :
// - une méthode pour afficher la page d'accueil
// - une méthode pour les erreurs 404

const mainController = {
    homePage: (request, response) => {
        response.render('home');
    },

    notFound: (req, res) => {
        res.render('404');
    }

};

module.exports = mainController;