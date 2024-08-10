import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { sendEmail } from "./utils/sendEmails.js"; // Assurez-vous que sendEmail est correctement exportée

const app = express();
const router = express.Router();

config({ path: "./config.env" });

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.post('/send/mail', async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "Please provide all details"
        });
    }

    try {
        await sendEmail({
            email: "ndenegeorgesmichelngor@gmail.com",
            subject: "GYM WEBSITE CONTACT",
            message,
            userEmail: email,
        });

        res.status(200).json({
            success: true,
            message: "Message sent successfully"
        });
    } catch (error) {
        console.error('Error sending email:', error); // Pour déboguer
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

router.get("/", (req, res) => {
    res.json({ success: true, message: "HABIBI COME TO DUBAI" });
});

// Utilisation du routeur sur l'application principale
app.use(router);

app.listen(process.env.PORT, () => {
    console.log(`Server listening at port ${process.env.PORT}`);
});
