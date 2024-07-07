const Todo = require('../models/todo');
// Controller method to get all todos
exports.getAllTodos = async (req, res) => {
 try {
 const todos = await Todo.findAll();
 res.json(todos);
 } catch (error) {
 res.status(500).json({ error: 'Internal Server Error', message: error.message });
 }
};
// Controller method to create a new todo
exports.createTodo = async (req, res) => {
 const { title, description } = req.body;
 try {
 const newTodo = await Todo.create({
    title,
    description
 });
 res.status(201).json(newTodo);
 } catch (error) {
 res.status(500).json({ error: 'Internal Server Error', message: error.message });
 }
};
// Controller method to get a todo by ID
exports.getTodoById = async (req, res) => {
 const id = req.params.id;
 try {
 const todo = await Todo.findByPk(id);
 if (todo) {
 res.json(todo);
 } else {
 res.status(404).json({ error: 'Todo not found' });
 }
 } catch (error) {
 res.status(500).json({ error: 'Internal Server Error' });
 }
};
// Controller method to update a todo by ID
exports.updateTodo = async (req, res) => {
 const id = req.params.id;
 const { title, description } = req.body;
 try {
 const todo = await Todo.findByPk(id);
 if (todo) {
 todo.title = title;
 todo.description = description;
 await todo.save();
 res.json(todo);
 } else {
 res.status(404).json({ error: 'Todo not found', message: error.message });
 }
 } catch (error) {
 res.status(500).json({ error: 'Internal Server Error', message: error.message });
 }
};
// Controller method to delete a todo by ID
exports.deleteTodo = async (req, res) => {
 const id = req.params.id;
 try {
 const todo = await Todo.findByPk(id);
 if (todo) {
 await todo.destroy();
 res.json(todo);
 } else {
 res.status(404).json({ error: 'Todo not found'});
 }
 } catch (error) {
 res.status(500).json({ error: 'Internal Server Error', message: error.message });
 }
};