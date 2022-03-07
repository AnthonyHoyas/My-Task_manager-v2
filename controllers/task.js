const sqlite3 = require('sqlite3').verbose();

// BACKEND FILE FOR MY DATABASES QUERIES

const taskdel = (data) => {

    let db = new sqlite3.Database('db/db.tasksdatabase');
    db.run(`DELETE FROM tasks WHERE Content="${data.data.content}"`, function(err) {
        if (err) {
          return console.log(err);
        }
        // get the last insert id
        console.log(`A row has been deleted with rowid ${this.lastID}`);
    });
  
    //console.log(data)
    db.close();

}

const addTask = (data) => {
console.log(data);
let db = new sqlite3.Database('db/db.tasksdatabase');

db.run(`INSERT INTO tasks (content, image) VALUES ("${data[0]}", "${data[1]}")`, function(err) {
    if (err) {
        return console.log(err);
    }
    console.log(`A row has been inserted with rowid ${this.lastID}`);
})
db.close();
}


const taskdb = (req, res) => {
    console.log('salutonpote');
    let sendData = {data: []};
  
    let db = new sqlite3.Database('db/db.tasksdatabase', (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the tasks database.');
    });
     db.serialize(() => {
      db.each(`SELECT * FROM tasks`, (err, row) => {
        if (err) {
          console.error(err.message);
        }
        console.log(row);
        console.log(row.content)
        sendData.data.push(row)
  
      });
       //res.send(sendData)
    });
  
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log(sendData)
      res.send(sendData)
      console.log('Close the database connection.');
    });
  
  }


exports.addTask = addTask
exports.taskdb = taskdb
exports.taskdel= taskdel