const { data } = require('jquery');
let Productions = require('../Models/production.model');

const GetAll = (request, response) => {
    Productions.selectAll(
        function (production) {
            response.render('layout', {title: APPNAME + ' | Accueil', APP: APPNAME, data: production});
        }
    );
};

const AddProductions = (request, response) => {
    const date = request.body.pDate;
    const unite = request.body.unite;
    const produit = request.body.produit;
    const objectif = request.body.objectif;
    const resultat = request.body.resultat;
    const event = request.body.event;
    const observation = 0;
    if (objectif >= resultat) {
       observation = 1;
    }else if (objectif < resultat) {
        observation = 0;
    }

    Productions.Create(
        date, objectif, resultat, event, observation, unite, produit,
        function (){
            request.flash('success', 'Successfully created');
            response.redirect('/Productions');
        }

    );
};

module.exports = GetAll, AddProductions;