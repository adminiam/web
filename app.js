const express = require('express');
const app = express();

app.use(express.json());

let users = [];

app.post('/users', (req, res) => {
    const user = req.body;

    if (!user.id || !user.name || !user.email) {
        return res.status(400).send('Потрібно вказати id, name та email');
    }

    users.push(user);
    res.status(201).send(user);
});

app.get('/users', (req, res) => {
    res.status(200).json(users);
});

app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id === id);

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).send('Користувача не знайдено');
    }
});

app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let userIndex = users.findIndex(user => user.id === id);

    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedUser };
        res.status(200).json(users[userIndex]);
    } else {
        res.status(404).send('Користувача не знайдено');
    }
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = users.length;

    users = users.filter(user => user.id !== id);

    if (users.length < initialLength) {
        res.status(200).send(`Користувач з ID ${id} видалений`);
    } else {
        res.status(404).send('Користувача не знайдено');
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Сервер працює на http://localhost:${port}`);
    });
