import express, { json } from 'express';
import userRoutes from './routes/user.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Adjust this as needed
}));

const port = process.env.PORT || 3000;

app.use(json());

app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
