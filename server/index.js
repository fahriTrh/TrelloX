const express = require('express');
const { PrismaClient } = require('./generated/prisma')
const { createServer } = require('node:http')
const { Server } = require('socket.io')
require('dotenv').config();

const app = express()
app.use(express.json());


// instansiasi
const prisma = new PrismaClient();

const server = createServer(app)

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {
    console.log('user connected', socket.id);
})

// api route
app.route('/api')
    // get fruit
    .get(async (req, res) => {
        const fruits = await prisma.fruit.findMany();

        res.json(fruits);
    })
    // store fruit
    .post(async (req, res) => {
        const { fruit } = req.body;

        const newFruit = await prisma.fruit.create({
            data: { name: fruit }
        })

        res.json({ status: 200, message: 'data berhasil ditambahkan!', fruit: newFruit });
        io.emit('new_fruit', newFruit)
    })

    // 

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});