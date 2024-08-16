let Access = require('./Config/Access');

class Production {
    static selectAll(callback){

        Access.query(
            "SELECT * FROM productions",
            function (err, rows){
                if(err) throw err;
                callback(rows);
            }
        );

    }

    static selectOne(id, callback){
        Access.query(
            "SELECT * FROM productions WHERE id = ?",
            [id],
            function (err, row){
                if(err) throw err;
                callback(row);
            }
        );
    }

    static Search(date, callback){

        Access.query(

            "SELECT * FROM productions WHERE date = ?",
            [date],
            function (err, row){
                if(err) throw err;
                callback(row);
            }

        );

    }

    static Create(date, objectif, result, event, unite, produit, callback){

        Access.query(
            "INSERT INTO productions SET date = ?, objectif = ?, resultat = ?, event = ?,idUnite = ?, idProduit = ?",
            [date, objectif, result, event, unite, produit],
            function(err, result){
                if(err) throw err;
                callback(result);
            }
        );

    }

    static Update(date, objectif, result, event, unite, produit, callback){

        Access.query(

            "UPDATE productions SET date = ?, objectif = ?, resultat = ?, event = ?, idUnite = ?, iProduit = ?",
            [date, objectif, result, event, unite, produit],
            function(err, result){
                if (err) throw err;
                callback(result);
            }

        );

    }

    static Delete(date, callback){

        Access.query(
            "DELETE * FROM productions WHERE date = ?",
            [date],
            function(err, result){
                if(err) throw err;
                callback(result);
            }
        );

    }
}

module.exports = Production;