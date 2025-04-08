const express = require(`express`)
const mongoose = require(`mongoose`)
const app = express()
const todoRouter = require(`./routes/todo.js`)
const logReqRes = require(`./middlewares`)
const PORT = 3000

mongoose.connect("mongodb+srv://root:root123@mongodbproject1.4stku.mongodb.net/Todo_App?retryWrites=true&w=majority")
    .then(() => console.log("Connected to DB"))
    .catch(err => console.error("DB Error:", err));


app.use(express.urlencoded({ extended: false }))
app.use(logReqRes("log.txt"))

app.use(`/api/todos`,todoRouter)


app.listen(PORT, () => {
    console.log("SERVER STARTED");

})

