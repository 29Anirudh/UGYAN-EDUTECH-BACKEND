const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const courseRoutes = require('./routes/course');
const enrollRoutes = require('./routes/enroll');
const progressRoutes=require('./routes/progress')
const cors = require('cors');

dotenv.config();
const app = express();
connectDB();
const allowedOrigins = [
  "http://localhost:5173",
  "https://edu.ugyan.in/",
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., mobile apps or Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true // Only if you're using cookies or Authorization headers
}));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollment', enrollRoutes);
app.use('/api/progress',progressRoutes);

app.listen(process.env.PORT || 5000, () => console.log('Server started'));