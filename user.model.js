let Access = require('./Config/Access');

class User {

    static selectAll(callback){

        Access.query(
            "SELECT * FROM users",
            function(err, rows){
                if(err) throw err;
                callback(rows);
            }
        );

    }

    static selectOne(username, password, callback){
        Access.query(
            "SELECT * FROM users WHERE username = ? AND password = ?",
            [username, password],
            function(err, row){
                if(err) throw err;
                callback(row);
            }
        );
    }

    static Create(username, password, role, callback){
        Access.query(
            "INSERT INTO users SET username = ?, password = ?, role = ?",
            [username, password, role],
            function(err, requette){
                if(err) throw err;
                callback(requette);
            }
        );
    }

    static Update(id, username, password, role, callback){
        Access.query(
            "UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?",
            [id, username, password, role],
            function(err, requette){
                if(err) throw err;
                callback(requette);
            }
        );
    }

    static Delete(id, callback){
        Access.query(
            "DELETE FROM users WHERE id = ?",
            [id],
            function(err, requette){
                if(err) throw err;
                callback(requette);
            }
        );
    }

    static Counter(callback){
        Access.query(
            "SELECT COUNT(*) as total FROM users",
            function(err, nbRows){
                if(err) throw err;
                callback(nbRows);
            }
        );
    }

}

module.exports = User;