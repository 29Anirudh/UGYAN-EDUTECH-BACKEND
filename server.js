const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const courseRoutes = require('./routes/course');
const enrollRoutes = require('./routes/enroll');
const cors = require('cors');

dotenv.config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enroll', enrollRoutes);

app.listen(process.env.PORT || 5000, () => console.log('Server started'));