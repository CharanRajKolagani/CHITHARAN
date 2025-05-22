const express = require('express');
const { Pool } = require('pg');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Database connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// Contact Form API
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        await pool.query('INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)', [name, email, message]);
        await sendMail(email, 'Thank you for contacting us', 'We will get back to you soon.');
        res.status(200).send('Message received');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Booking Form API
app.post('/booking', async (req, res) => {
    const { name, email, date, details } = req.body;
    try {
        await pool.query('INSERT INTO bookings (name, email, event_date, details) VALUES ($1, $2, $3, $4)', [name, email, date, details]);
        await sendMail(email, 'Booking Confirmation', 'Your event has been booked successfully.');
        res.status(200).send('Booking confirmed');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Mail Generation using Brevo
async function sendMail(to, subject, text) {
    try {
        await axios.post('https://api.brevo.com/v3/smtp/email', {
            sender: { email: process.env.BREVO_SENDER },
            to: [{ email: to }],
            subject,
            textContent: text
        }, {
            headers: { 'api-key': process.env.BREVO_API_KEY, 'Content-Type': 'application/json' }
        });
        console.log('Email sent successfully');
    } catch (err) {
        console.log('Email error:', err);
    }
}

app.listen(5000, () => console.log('Server running on port 5000'));
