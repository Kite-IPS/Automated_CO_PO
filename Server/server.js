import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import connectDB from './Config/db.js';
import AuthRoute from './Routes/AuthRoute.js';
import CopoRouter from './Routes/CopoRoute.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(cors({
  origin: '*',
  credentials: true,
}));

app.use('/auth', AuthRoute)
app.use('/copo', CopoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectDB();