// lib and imports
const express = require("express");
const app = express();

const task = require("./controllers/task")
// const img = require("./controllers/img")

// app setup
app.use(express.json())
app.use("/static", express.static("public"));
app.set("view engine", "ejs");


// pages
app.get('/',(req, res) => {
  // callback
  res.render('tasks.ejs');
});


// Create here your api setup

app.post('/api/addTask', (req, res) => {
  task.addTask(req.body)
})


app.post('/api/deltask', (req, res) => {
  task.taskdel(req.body)
})

app.post('/api/task', task.taskdb)



app.listen(3000, () => console.log("Server Up and running"));
