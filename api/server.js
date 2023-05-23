const express = require('express');
const mongo = require('mongoose');
const cors = require('cors');
const PORT = 3001;

const app = express();

app.use(express.json());
app.use(cors());

mongo.connect("mongodb://127.0.0.1:27017/Todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to DB"))
    .catch(console.error);

const Todo = require('./models/Todo');

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();

    res.json(todos);
});

app.post('/todo/new', async (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        complete: false
    })

    todo.save();

    res.json(todo);
})

app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
})

app.put('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;
    todo.save();

    res.json(todo);
})

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
