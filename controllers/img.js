const sqlite3 = require('sqlite3').verbose();


const addImg = (data) => {
    console.log(data);
    let db = new sqlite3.Database('db/db.tasksdatabase');
    
    db.run(`INSERT INTO tasks (image) VALUES ("${data}")`, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    })
    db.close();
    }

exports.addImg = addImg