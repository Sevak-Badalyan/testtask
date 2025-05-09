import express from 'express';
import sequelize from './database';
import ticketRoutes from './routes/ticketRoutes';

import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/tickets', ticketRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('Ticket Management System API is running');
});

// Global Error Handler

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  });
  
// Start the Server
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(`Server is running on port ${PORT}`);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
});
