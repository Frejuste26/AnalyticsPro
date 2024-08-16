let Produitor = require('../Models/produit.model');

const GetAll = (request, response) =>{

    Produitor.selectAll(
        function (produit){
            response.render("/Products", {'data': produit});
        }
    );

};

const GetOne = (request, response) => {
    const id = request.params.id;
    Produitor.selectOne(
        id, function (produit){
            response.render("/ProduitDetail", {'data': produit});
        }
    );
};

const AddProduit = (request, response) => {
    const code = request.body.code;
    const name = request.body.name;
    const description = request.body.description;
    const pice = request.body.price;
    const unite = request.body.unite;

    Produitor.Create(
        code, name, description, pice, unite,
        function () {
            request.flash('success', 'Successfully created');
            response.redirect('/Products');
        }
    );
};

const UpdateProduit = (request, response) => {
    const code = request.body.code;
    const name = request.body.name;
    const description = request.body.description;
    const pice = request.body.price;
    const unite = request.body.unite;

    Produitor.Update(
        code, name, description, pice, unite,
        function () {
            request.flash('success', 'Successfully created');
            response.redirect('/Products');
        }
    );
};

const DeleteProduit = (request, response) => {
    const id = request.params.id;

    Produitor.Delete(
        id, function () {
            request.flash('success', 'Successfully created');
            response.redirect('/Products');
        }
    );
}

module.exports = {GetAll, GetOne, AddProduit, UpdateProduit, DeleteProduit};