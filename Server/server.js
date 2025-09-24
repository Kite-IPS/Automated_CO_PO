import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Config/db.js';
import AuthRoute from './Routes/AuthRoute.js';

dotenv.config();
const app = express();
const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : 6000;

app.use(express.json());

app.use('/auth', AuthRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectDB();