const Todo = require("../model/todo.js")

const handleAddTodoById = async (req,res)=>{
        const title = req.body.title;
        
        try {
            const newTask = new Todo({ task: title }); // create a Todo instance
            await newTask.save(); //  save to DB
            res.status(201).send("Task Added");
        } catch (err) {
            console.error("Error saving task:", err);
            res.status(500).send("Error adding task");
        }
    
   
}

const handleGetAllTodos = async (req,res)=>{

        const allDbTodos = await Todo.find({})
    
        const html = `
            <h1>TODOS</h1>
            <h3>${allDbTodos.map((todo) => `<li>${todo.task}</li>`).join("")}</h3>    
            `
        res.send(html)

}
const handleGetTodoById = async (req,res)=>{
        
        const singleTodo = await Todo.findById(req.params.id)
        
        const html = `
        <h1>TODO</h1>
        <h3>${singleTodo.task}</h3>    
        `
        res.send(html)   
}
const handleUpdateTodoById = async (req,res)=>{
        const title = req.body.title;
        await Todo.findByIdAndUpdate(req.params.id, {task: title})
          res.json({"mesage": "success"})
   
}
const handleDeleteTodoById = async (req,res)=>{
       await Todo.findByIdAndDelete(req.params.id)
        res.json({"mesage": "success"})
   
}

module.exports = {
    handleGetAllTodos,
    handleGetTodoById,
    handleUpdateTodoById,
    handleDeleteTodoById,
    handleAddTodoById
}
