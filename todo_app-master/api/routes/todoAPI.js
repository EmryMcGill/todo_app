const { readFileSync, writeFileSync, appendFileSync } = require('fs');
const express = require('express');
const router = express.Router();

// SEND TODOS TO THE CLIENT
router.get('/', (req, res, next) => {
    // read the current file
    const todos = readFileSync('todo.json', 'utf-8');
    let parsedtodos;
    // check if file is empty
    if (todos == '') {
        // create the template for the file and insert the first todo
        parsedtodos = {
            todos: [
                {title: 'you have no todos', id: 123}
            ]
        }
    }
    else {
        // parse the string data to a js object
        parsedtodos = JSON.parse(todos);
    }

    res.json(parsedtodos);
});

// RECEIVE A NEW TODO FROM THE CLIENT
router.post('/', (req, res, next) => {
    // get the new todo from the client
    const todo = req.body;

    // read the current file
    const todos = readFileSync('todo.json', 'utf-8');
    let parsedtodos;
    // check if file is empty
    if (todos == '') {
        // create the template for the file and insert the first todo
        parsedtodos = {
            todos: []
        }
    }
    else {
        // parse the string data to a js object
        parsedtodos = JSON.parse(todos);
    }

    // append the new todo to the todos
    parsedtodos.todos.push(todo);

    // overright the file with the new todo list
    writeFileSync('todo.json', JSON.stringify(parsedtodos, null, 1), 'utf-8');
    res.send("all good")
});

router.delete('/', (req, res, next) => {
    // read the current file
    const todos = readFileSync('todo.json', 'utf-8');
    let parsedtodos;
    // check if file is empty
    if (todos == '') {
        // create the template for the file and insert the first todo
        parsedtodos = {
            todos: []
        }
    }
    else {
        // parse the string data to a js object
        parsedtodos = JSON.parse(todos);
    }
    // delete the target todo from the list
    parsedtodos.todos = parsedtodos.todos.filter((todo) => todo.id !== req.body.id);

    // overright the file with the new todo list
    writeFileSync('todo.json', JSON.stringify(parsedtodos, null, 1), 'utf-8');
    res.send("all good")
});


module.exports = router;