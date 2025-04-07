const express = require(`express`)
const mongoose = require(`mongoose`)
const app = express()

const PORT = 3000

mongoose.connect("mongodb+srv://root:root123@mongodbproject1.4stku.mongodb.net/Todo_App?retryWrites=true&w=majority")
    .then(() => console.log("Connected to DB"))
    .catch(err => console.error("DB Error:", err));

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    }

}, { timestamps: true }
)

const Todo = mongoose.model(`todo`, todoSchema)

app.use(express.urlencoded({ extended: false }))

app.post(`/api/todos`, async (req, res) => {

    const title = req.body.title;

    try {
        const newTask = new Todo({ task: title }); // create a Todo instance
        await newTask.save(); //  save to DB
        res.status(201).send("Task Added");
    } catch (err) {
        console.error("Error saving task:", err);
        res.status(500).send("Error adding task");
    }

})
app.get(`/api/todos`, async (req, res) => {

    const allDbTodos = await Todo.find({})

    const html = `
        <h1>TODOS</h1>
        <h3>${allDbTodos.map((todo) => `<li>${todo.task}</li>`).join("")}</h3>    
        `
    res.send(html)
})
app.get(`/api/todos/:id`, async (req, res) => {

    const singleTodo = await Todo.findById(req.params.id)

    const html = `
        <h1>TODO</h1>
        <h3>${singleTodo.task}</h3>    
        `
    res.send(html)
})
app.delete(`/api/todos/:id`, async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id)
    res.json({"mesage": "success"})
})

app.patch(`/api/todos/:id`,async (req, res)=>{
  await Todo.findByIdAndUpdate(req.params.id, {task: "texst update"})
    res.json({"mesage": "success"})
})


app.listen(PORT, () => {
    console.log("SERVER STARTED");

})

