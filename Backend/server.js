const express = require('express');
const http = require('http');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const connectToDb = require('./db/db');

const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');

const app = express();

connectToDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use('/users', userRoutes);
app.use('/captain', captainRoutes);


app.get('/', (req, res) => {
    res.send('API is working');
});


const port = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});