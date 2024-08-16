let Unite = require("../Models/unite.model");
const APPNAME = process.env.APP_NAME;

//Function that permet to get a list of all the available unites
const GetAll = (request, response) => {

    Unite.selectAll(
        function (unite){
            response.render('./Pages/unites', {title: APPNAME + '| Unites', data: unite, APP: APPNAME});
        }
    );

};

//Function that permet to get one unite in the database
const GetOne = (request, response) => {
    const id = parseInt(request.params.id);

    Unite.selectOne(
        id, function (unite){
            console.log(id);
            console.log(unite);
            response.render("./Pages/formUpdate", {'data': unite, APP: APPNAME});
        }
    );
};

//Function that allows to add a new unite to the database
const AddUnite = (request, response) => {
    const name = request.body.name;
    const responsable = request.body.responsable;
    const fonction = request.body.fonction;
    const description = request.body.description;


    Unite.Create(
        
        name,
        responsable,
        fonction,
        description,
        
        function () {
            request.flash('success', 'Successfully created');
            response.redirect('/AddUnites');
        }

    );

};

//Function to update an existing unite 
const UpdateUnite = (request, response) => {
    const name = request.body.name;
    const responsable = request.body.responsable;
    const fonction = request.body.fonction;
    const description = request.body.description;

    Unite.Upadate(

        name,
        responsable,
        fonction,
        description,
        function () {
            request.flash('success', 'Successfully updated ' + name);
            response.redirect('/Unite');
        }
    );
}

//Function for deleted an existing unite
const DeleteUnite = (request, response) => {
    const id = request.params.id;

    Unite.Delete(
        id, function () {
            request.flash('success', 'Successfully updated ');
            response.redirect('/Unite');
        }
    );
}

module.exports = {GetAll, GetOne, AddUnite, UpdateUnite, DeleteUnite};