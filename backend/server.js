const express = require("express");

const cors = require("cors");

const db = require("./db");


const app = express();

const PORT = process.env.PORT || 5000;


app.use(cors());

app.use(express.json());


// Health check

app.get("/api/health", (req, res) => {

    res.json({

        status: "UP",

        application: "RajMail Backend"

    });

});


// Get emails

app.get("/api/emails", async (req, res) => {

    try {

        const [rows] = await db.query(`

            SELECT *

            FROM emails

            WHERE receiver = 'raj@example.com'

            ORDER BY created_at DESC

        `);

        res.json(rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Database error"

        });

    }

});


// Get sent emails

app.get("/api/sent", async (req, res) => {

    try {

        const [rows] = await db.query(`

            SELECT *

            FROM emails

            WHERE sender = 'raj@example.com'

            ORDER BY created_at DESC

        `);

        res.json(rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Database error"

        });

    }

});


// Send email

app.post("/api/emails", async (req, res) => {

    try {

        const {
            sender,
            receiver,
            subject,
            message
        } = req.body;


        if (
            !sender ||
            !receiver ||
            !subject ||
            !message
        ) {

            return res.status(400).json({

                message: "All fields are required"

            });

        }


        const [result] = await db.query(`

            INSERT INTO emails

            (sender, receiver, subject, message)

            VALUES (?, ?, ?, ?)

        `, [

            sender,
            receiver,
            subject,
            message

        ]);


        res.status(201).json({

            message: "Email sent successfully",

            id: result.insertId

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Unable to send email"

        });

    }

});


// Start server

app.listen(PORT, () => {

    console.log(
        `RajMail backend running on port ${PORT}`
    );

});
