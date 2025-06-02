import pool from "../config/postgres.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { signupSchema, loginSchema } from "../validators/userValidator.js";
import HttpError from "../utils/HttpError.js";

export const signup = async (req, res, next) => {
    const { error } = signupSchema.validate(req.body);
    if (error) return next(new HttpError(400, error.details[0].message));

    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
        [username, hashedPassword]
        );

        res.status(201).json({ message: "Användare skapad", user: result.rows[0] });
    } catch (err) {
        if (err.code === "23505") {
        return next(new HttpError(409, "Användarnamnet är redan taget"));
        }
        next(new HttpError(500, "Kunde inte skapa användare"));
    }
};

export const login = async (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) return next(new HttpError(400, error.details[0].message));

    const { username, password } = req.body;

    try {
        const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

        if (result.rowCount === 0) {
        return next(new HttpError(401, "Fel användarnamn eller lösenord"));
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
        return next(new HttpError(401, "Fel användarnamn eller lösenord"));
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "2h",
        });

        res.status(200).json({ message: "Inloggning lyckades", token, userId: user.id });
    } catch (err) {
        next(new HttpError(500, "Kunde inte logga in"));
    }
};
