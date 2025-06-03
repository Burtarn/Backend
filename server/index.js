import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler from './middleware/errorHandler.js';
import { httpLogger, logger } from './utils/Logger.js'; 


import { swaggerUi, swaggerDocument } from './utils/swagger.js'; 

//! Rutter
import userRoutes from './routes/UserRoutes.js';
import notesRoutes from './routes/notesRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//! Middleware
app.use(cors());
app.use(express.json());
app.use(httpLogger);

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 

//! Rutter
app.use('/api/user', userRoutes);   
app.use('/api/notes', notesRoutes);  

//! Health check
app.get('/', (req, res) => {
    res.send('Servern är igång!');
});

//! 404 fallback
app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

//! Global error handler 
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(` Server is running on http://localhost:${PORT}`);
    console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
});
