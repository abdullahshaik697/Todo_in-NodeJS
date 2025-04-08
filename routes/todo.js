
const express = require('express')
const router = express.Router()

const {
    handleGetAllTodos,
    handleGetTodoById,
    handleUpdateTodoById,
    handleDeleteTodoById,
    handleAddTodoById
}= require('../controllers/todo')

router.route(`/`)
.get(handleGetAllTodos)
.post(handleAddTodoById)
 
router.route(`/:id`)
.get(handleGetTodoById)
.patch(handleUpdateTodoById)
.delete(handleDeleteTodoById)

module.exports = router