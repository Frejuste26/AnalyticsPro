let Access = require('./Config/Access');

class Unite{

    static selectAll(callback){

        Access.query(
            'SELECT * FROM unites',
            function (err, rows){
                if(err) throw err;
                callback(rows);
            }
        );

    };

    static Search(name, callback){
        Access.query(
            "SELECT * FROM unites WHERE name = ?",
            [name],
            function (err, data){
                if(err) throw err;
                callback(data);
            }
        );
    }

    static selectOne(id, callback){

        Access.query(
            "SELECT * FROM unites WHERE id = ?",
            [id],
            function (err, row){
                if(err) throw err;
                callback(row);
            }
        );

    };

    static Create(name, responsable, fonction, description, callback){

        Access.query(
            "INSERT INTO unites SET name = ?, responsable = ?, fonction = ?, description = ?",
            [name, responsable, fonction, description],
            function (err, result){
                if(err) throw err;
                callback(result);
            }
        );

    };

    static Upadate(name, responsable, fonction, description, callback){
        
        Access.query(
            "UPDATE unites SET responsable =?, fonction =?, description =? WHERE name =?",
            [responsable, fonction, description, name],
            function (err, result){
                if(err) throw err;
                callback(result);
            }
        );
    };

    static Delete(id, callback){

        Access.query(
            "DELETE FROM unites WHERE id =?",
            [id],
            function (err, result){
                if(err) throw err;
                callback(result);
            }
        );

    };

};

module.exports = Unite;