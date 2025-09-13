// server.js — Express server, API routes, static hosting for frontend
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');


const ledenRouter = require('./routes/leden');
const reservationsRouter = require('./routes/reservations');


const app = express();
const PORT = process.env.PORT || 3000;


// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// API
app.use('/api/leden', ledenRouter);
app.use('/api/reservations', reservationsRouter);


// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));


// Fallback for SPA
app.get('*', (req, res) => {
res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Connect to DB then start server
async function start() {
try {
const uri = process.env.MONGODB_URI;
if (!uri) throw new Error('MONGODB_URI is not set in environment');
await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log('Connected to MongoDB');
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} catch (err) {
console.error('Failed to start server:', err);
process.exit(1);
}
}


start();
