    import jwt from 'jsonwebtoken';
    import dotenv from 'dotenv';

    dotenv.config();

    const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;


    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Ingen token tillhandahållen' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded JWT:", decoded);
        req.user = { id: decoded.userId };
        next();
    } catch (error) {
        res.status(403).json({ message: 'Ogiltig eller utgången token' });
    }
    };

    export default authMiddleware;
