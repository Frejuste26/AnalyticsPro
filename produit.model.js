let Access = require('./Config/Access');

class Produit {

    static selectAll(callback) {

        Access.query(
            "SELECT * FROM produits",
            function(err, rows){
                if (err) throw err;
                callback(rows);
            }
        );

    };

    static selectOne(code, callback){

        Access.query(

            "SELECT * FROM produits WHERE code = ?",
            [code],
            function(err, row){
                if(err) throw err;
                callback(row);
            }

        );

    };

    static Create(code, name, description, price, unite, callback){

        Access.query(

            "INSERT INTO produits SET code = ?, name = ?, description = ?, prix = ?, idUnite = ?",
            [code, name, description, price, unite],
            function(err, result){
                if(err) throw err;
                callback(result);
            }

        );

    };

    static Update(name, description, price, unite, code, callback){

        Access.query(

            "UPDATE produits SET name = ?, description = ?, prix = ?, idUnite = ? WHERE code = ?",
            [name, description, price, unite, code],
            function(err, result){
                if(err) throw err;
                callback(result);
            }

        );

    }

    static Delete(code, callback){
        Access.query(
            "DELETE FROM produits WHERE code = ?",
            [code],
            function(err, result){
                if(err) throw err;
                callback(result);
            }
        );
    };

    static Counter(callback){
        Access.query(
            "SELECT COUNT(*) as total FROM produits",
            function(err, nbRows){
                if(err) throw err;
                callback(nbRows);
            }
        );
    }

}

module.exports = Produit;