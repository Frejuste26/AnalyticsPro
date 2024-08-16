let express = require('express');
const router = express.Router();
const APPNAME = process.env.APP_NAME;
let Unite = require("../Models/unite.model");
let Product = require("../Models/produit.model");
let Productions = require("../Models/production.model");
let UserModel = require("../Models/user.model");

router.get('/register', (request, response) => {
    response.render('./Authentication/register', {title: APPNAME + 'Register'});
});


router.post('/Register', (request, response) => {
    const username = request.body.username;
    const password = request.body.password;
    const confirm = request.body.confirmer;
    const role = "curent";
    
    if (password === confirm){
        UserModel.Counter(
            function (total){
                let count = total;
                if (count == 0){
                    role = "admin";
                    UserModel.Create(
                        username,  password, role,
                        function(){
                            request.flash('success', 'User created successfully');
                            response.redirect('/Login');
                        }
                    );
                }else{
                    UserModel.Create(
                        username,  password, role,
                        function(){
                            request.flash('success', 'User created successfully');
                            response.redirect('/Login');
                        }
                    );
                }
            }
        );
    }else{
        request.flash('error', 'Les mots de passe ne correspondent pas.');
        response.redirect('/register');
    }
});

router.get('/login', (request, response) => {
    response.render("./Authentication/login", {title: APPNAME + 'Login'});
});

router.post('/Login', (request, response) => {
    const username = request.body.username;
    const password = request.body.password;

    UserModel.selectOne(
        username, password,
        function (user){
            if (user){
                request.session.sessionToken = user.map(result => result.username);
                response.redirect('/');
            }else{
                request.flash('error', 'Username ou mot de passe incorrect.');
                response.redirect('/login');
            }
        }
    );
});

router.get('/', (request, response) => {
    let mydata = [];
    let myUnite = [];
    let objectif = [];
    let resultat = [];
    if (request.session.sessionToken) {
        Unite.selectAll(
            function (unite){
                Productions.selectAll(
                        function (production) {
                            unite.forEach(unite => {
                                production.forEach((result, i) => {
                                    if(result.idUnite == unite.id){
                                        const taux = Math.floor((result.resultat * 100)/result.objectif);
                                        mydata.push(taux);
                                        myUnite.push(unite.name);
                                        objectif.push(result.objectif);
                                        if (result.idProduit == result[i+1]?.idProduit){
                                            resultat.push(result.resultat+result[i+1]?.resultat);
                                        }else{
                                            resultat.push(result.resultat);
                                        }
                                        
                                    }
                                });
                            });
                            response.render('./layout', {title: APPNAME + ' | Accueil', APP: APPNAME, data: production, unites: unite, total: 0, username: request.session.sessionToken, label: myUnite, datas: mydata, myobject: objectif, myresult: resultat});
                        }
                );
            }
        );
    }else{
        response.redirect('/login');
    }

});

router.get('/Analyse', (request, response) => {
    if(request.session.sessionToken){
        Unite.selectAll(
            function (unite){
                Productions.selectAll(
                    function (production) {
                        response.render('./Pages/analyse', {title: APPNAME + ' | Accueil', APP: APPNAME, data: production, unites: unite, total: 0, username: request.session.sessionToken});
                    }
                );
            }
        );
    }else{
        response.redirect('/login');
    }

});

router.get('/Productions', (request, response) => {
    if (request.session.sessionToken) {
        Unite.selectAll(
            function (unite){
                Product.selectAll(
                    function (produits){
                        response.render('./Pages/productions', {data: unite, title: APPNAME + '| Productions', APP: APPNAME, products: produits, username: request.session.sessionToken});
                    }
                );
            }
        );
    } else {
        response.redirect('/login');
    }
});

router.post('/Productions', (request, response) => {
    const date = request.body.date;
    const objectif = request.body.objectif;
    const resultat = request.body.resultat;
    const event = request.body.event;
    const unite = request.body.unite;
    const produit = request.body.produit;
    
    Productions.Create(
        date,
        objectif,
        resultat,
        event,
        unite,
        produit,
        function (){
            request.flash('success', 'Successfully created');
            response.redirect('/Productions');
        }
    );
});

router.get('/Products', (request, response) => {
    if (request.session.sessionToken) {
        Product.selectAll(
            function (produits){
                response.render('./Pages/produits', {title: APPNAME + '| Produits', APP: APPNAME, data: produits, username: request.session.sessionToken});
            }
        );
    } else {
        response.redirect('/login');
    }
});


router.post('/Search', (request, response) => {
    const date = request.body.date;
    Unite.selectAll(
        function(unite){
            Productions.Search(
                date,
                function (data){
                    request.flash('success', 'Search Success ');
                    response.render('./Pages/trier', {result: data,unites: unite, title: APPNAME + '| Trier', APP: APPNAME, username: request.session.sessionToken});
                }
            );
        }
    );
});

router.get('/Products/add', (request, response) => {
if (request.session.sessionToken) {
    Unite.selectAll(
        function (unite){
            response.render('./Pages/formProduit', {data: unite, title: APPNAME + '| Ajouter Produit', APP: APPNAME, username: request.session.sessionToken});
        }
    );
}else{
    response.redirect('/login');
}
});

router.post('/Products/add', (request, response) =>{
    const code = request.body.code;
    const name = request.body.name;
    const description = request.body.description;
    const price = request.body.prix;
    const unite = request.body.unite;
    
    Product.Create(
        code, name, description, price, unite,
        function () {
            request.flash('success', 'Successfully created');
            response.redirect('/Products/add');
        }
    );
});

router.get('/Products/edit/:code', (request, response) => {
    if (request.session.sessionToken) {
        const code = request.params;
        Unite.selectAll(
            function (unite){
                response.render('./Pages/formUpdate', {data: unite, title: APPNAME + '| Modifier Produit', APP: APPNAME, username: request.session.sessionToken});
            }
        );
    } else {
        response.redirect('/login');
    }
});

router.post('/Products/edit', (request, response) => {
    const code = request.body.code;
    const name = request.body.name;
    const description = request.body.description;
    const price = request.body.prix;
    const unite = request.body.unite;
    
    Product.Update(
        code, name, description, price, unite,
        function(){
            request.flash('success', 'Product updated successfully');
            response.redirect('/Products');
        }
    );
});

router.get('/Products/delete/:code', (request, response) => {
    if (request.session.sessionToken) {
        const { code } = request.params;
        Product.selectOne(
            code,
            function (product) {
                response.render('./Pages/formDelete', {data: product, title: APPNAME + '| Supprimer Produit', APP: APPNAME, username: request.session.sessionToken})
            }
        );
    } else {
        response.redirect('/login');
    }

});

router.post('/Products/delete', (request, response) => {
    const code = request.body.code;
    Product.Delete(
        code,
        function (result){
            request.flash('success', 'Product deleted successfully');
            response.redirect('/Products');
            console.log(result);
        }
    )
});

router.get('/Unite', (request, response) => {
    if (request.session.sessionToken) {
        Unite.selectAll(
            function (unite) {
                response.render('./Pages/unites', {data: unite, title: APPNAME + '|Unites', APP: APPNAME, username: request.session.sessionToken})
            }
        );
    } else {
        response.redirect('/login');
    }

});

router.get('/AddUnites', (request, response) => {
    if (request.session.sessionToken) {
        response.render('./Pages/formUnite', {title: APPNAME + '| Ajouter Unites', APP: APPNAME, username: request.session.sessionToken});
    } else {
        response.redirect('/login');
    }
    
});

router.post('/Unite/Add', (request, response) => {
    const name = request.body.name;
    const responsable = request.body.responsable;
    const fonction = request.body.fonction;
    const description = request.body.description;
    
    Unite.Create(
        name, responsable, fonction, description,
        function (){
            request.flash('success', 'Successfully created');
            response.redirect('/AddUnites');
        }
    );
});

router.get('/Unite/:id', (request, response) => {
   
    if (request.session.sessionToken) {
        const id = request.params.id;
        Unite.selectOne(
            id,
            function(unite){
                response.render('./Pages/uniteUpdate', {data: unite, title: APPNAME + '| Modifier Unites', APP: APPNAME, username: request.session.sessionToken});
            }
        );
    } else {
        response.redirect('/login');
    }

});

router.get('/Unite/delete/:id', (request, response) => {
    if (request.session.sessionToken) {
        const { id } = request.params;
        //console.log(id);
        Unite.selectOne(
            id,
            function (unite) {
                response.render('./Pages/UniteDelete', {data: unite, title: APPNAME + '| Supprimer Produit', APP: APPNAME, username: request.session.sessionToken})
            }
        );
    } else {
        response.redirect('/login');
    }
});

router.post('/Unite/delete', (request, response) => {
    const {id} = request.body;
    Unite.Delete(
        id,
        function (){
            request.flash('success', 'Successfully deleted');
            response.redirect('/unite');
        }
    );
});

module.exports = router;